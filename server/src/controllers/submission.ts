import { Request, Response } from "express";
import Submission from "../models/submission";

export const getSubmissionByUser = async (req: Request, res: Response) => {
  const id = req.userId;
  try {
    const submissions = await Submission.find({ user_id: id })
      .sort({ createdAt: -1 })
      .populate("problem_id");

    res.status(200).json({ submissionLists: submissions });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
