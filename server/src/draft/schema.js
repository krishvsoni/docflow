import mongoose from "mongoose";

const draftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

draftSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

const Draft = mongoose.model("Draft", draftSchema);
export default Draft;
export { draftSchema };
