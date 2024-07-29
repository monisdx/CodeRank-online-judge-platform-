import express from "express";
import {
  createProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} from "../controllers/problems";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", auth, createProblem);
router.get("/", getProblems);
router.get("/:id", getProblem);
router.put("/:id", auth, updateProblem);
router.delete("/:id", auth, deleteProblem);

export default router;
