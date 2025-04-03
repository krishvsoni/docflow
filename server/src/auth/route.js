import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./schema.js";

dotenv.config();

const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === "production"
      ? "https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google/callback"
      : "https://docflow-bncjgqaya5gtfwb0.eastasia-01.azurewebsites.net/auth/google/callback",
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.appdata",
      "https://www.googleapis.com/auth/drive.metadata",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
    accessType: "offline",
    prompt: "consent",
    },
    async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
  
      if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value,
        accessToken,
        refreshToken,
      });
      } else {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      }
  
      await user.save();
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
    }
  )
  );

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

router.get("/google", passport.authenticate("google", { 
    scope: [
      "profile",
      "email"
    //   "https://www.googleapis.com/auth/drive",
    //   "https://www.googleapis.com/auth/drive.file",
    //   "https://www.googleapis.com/auth/drive.appdata",
    //   "https://www.googleapis.com/auth/drive.metadata",
    //   "https://www.googleapis.com/auth/drive.metadata.readonly",
    //   "https://www.googleapis.com/auth/drive.readonly",
    ],
    accessType: "offline",
    prompt: "consent"
  }));


  router.get("/reset-google-auth", async (req, res) => {
    try {
      if (req.user && req.user._id) {
        const user = await User.findById(req.user._id);
        if (user) {
          user.accessToken = undefined;
          user.refreshToken = undefined;
          await user.save();
          
          return res.redirect("/auth/google");
        }
      }
      
      res.redirect("/auth/google");
    } catch (error) {
      console.error("Error resetting Google auth:", error);
      res.status(500).json({ message: "Failed to reset authentication" });
    }
  });
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.NODE_ENV === "production"
      ? "https://docflow-three.vercel.app/dashboard"
      : "http://localhost:5173/dashboard",
    failureRedirect: process.env.NODE_ENV === "production"
      ? "https://docflow-three.vercel.app"
      : "http://localhost:5173",
  })
);



router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect( "https://docflow-three.vercel.app");
    });
});

router.get("/user", async (req, res) => {
  if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id);
      res.json({
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          // accessToken: user.accessToken || null,
      });
  } else {
      res.json(null);
  }
});





export default router;
export { passport };
export { router };
