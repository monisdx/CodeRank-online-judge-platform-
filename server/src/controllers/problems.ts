import Problem from "../models/problem";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const getProblems = async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find();

    res.status(200).json({ problemlist: problems });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProblem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findById(id);

    res.status(200).json({ problem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProblem = async (req: Request, res: Response) => {
  const problem = req.body;

  try {
    const newProblem = new Problem(problem);

    await newProblem.save();

    res.status(200).json({ message: "Problem added Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProblem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const problem = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Problem with that id");

    await Problem.findByIdAndUpdate(id, problem, { new: true });

    res.status(200).json({ message: "Problem Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProblem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No Problem with that id");

    await Problem.deleteOne({ _id: id });

    res.status(200).json({ message: "Problem Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
