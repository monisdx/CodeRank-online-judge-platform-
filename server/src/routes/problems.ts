import express from "express";
import {
  createProblem,
  getProblem,
  getProblems,
  updateProblem,
  deleteProblem,
  getProblemsbysearch,
} from "../controllers/problems";

const router = express.Router();

router.post("/", createProblem);
router.get("/", getProblems);
router.get("/search", getProblemsbysearch);
router.get("/:id", getProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;
