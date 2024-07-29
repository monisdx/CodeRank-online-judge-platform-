import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  user_id: String,
  problem_id: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  status: Boolean,
  message: String,
  language: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);
export default Submission;
