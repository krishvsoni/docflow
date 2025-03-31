import express from "express";
import Draft from "./schema.js";
import { uploadToDrive } from "./google-drive/drive.js";
const DraftRouter = express.Router();
import User from "../auth/schema.js";

// const isAuthenticated = (req, res, next) => {
//   if (!req.isAuthenticated() || !req.user) {
//     return res.status(401).json({ message: "User not authenticated" });
//   }
//   next();
// };

DraftRouter.post("/save", async (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const draft = new Draft({ userId, title, content });
    await draft.save();
    res.status(201).json({ message: "Draft saved successfully", draft });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});





DraftRouter.get("/:userId", async (req, res) => {
  try {
    const drafts = await Draft.find({ userId: req.params.userId })
      .populate("userId", "name email profilePic") 
      .sort({ lastUpdated: -1 });

    res.json(drafts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

DraftRouter.put("/edit/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedDraft = await Draft.findByIdAndUpdate(
      req.params.id,
      { title, content, lastUpdated: Date.now() },
      { new: true }
    );
    if (!updatedDraft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    res.json({ message: "Draft updated successfully", updatedDraft });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

DraftRouter.delete("/:id", async (req, res) => {
  try {
    const draft = await Draft.findByIdAndDelete(req.params.id);
    if (!draft) {
      return res.status(404).json({ message: "Draft not found" });
    }
    res.json({ message: "Draft deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// const checkNeedsReauth = async (req, res, next) => {
//   if (req.user && req.user.needsGoogleReauth) {
//     return res.redirect('/auth/reset-google-auth');
//   }
//   next();
// };


DraftRouter.post("/save-to-drive", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      message: "User not authenticated",
      action: "reauth",
      authUrl: "/auth/google"
    });
  }

  const { _id } = req.body;
  if (!_id) return res.status(400).json({ message: "Draft ID is required" });

  try {
    const draft = await Draft.findById(_id).populate("userId");
    if (!draft) return res.status(404).json({ message: "Draft not found" });

    const userId = draft.userId._id.toString();
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to save this draft" });
    }

    try {
      const user = await User.findById(userId);
      if (!user || (!user.accessToken && !user.refreshToken)) {
        await User.findByIdAndUpdate(userId, {
          $unset: { accessToken: 1, refreshToken: 1 }
        });
        return res.status(401).json({
          message: "Google Drive authentication required",
          action: "reauth",
          authUrl: "/auth/google"
        });
      }

      const fileData = await uploadToDrive(userId, draft.title, draft.content);
      res.status(200).json({
        message: "Document saved to Google Drive successfully",
        fileUrl: fileData.webViewLink,
      });
    } catch (error) {
      console.error("Drive API error:", error);

      if (error.message.includes("Authentication") ||
          error.message.includes("token") ||
          error.code === 401 ||
          error.code === 403) {

        await User.findByIdAndUpdate(userId, {
          $unset: { accessToken: 1, refreshToken: 1 }
        });
        return res.status(401).json({
          message: "Google Drive authentication required",
          action: "reauth",
          authUrl: "/auth/google"
        });
      }

      res.status(500).json({
        message: "Failed to save document to Drive",
        error: error.message
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? error.stack : undefined
    });
  }
});


export default DraftRouter;
