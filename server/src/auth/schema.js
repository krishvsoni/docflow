import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        profilePic: { type: String },
        accessToken: { type: String }, 
        refreshToken: { type: String }, 
        createdAt: { type: Date, default: Date.now },
        needsGoogleReauth: { type: Boolean, default: false }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
