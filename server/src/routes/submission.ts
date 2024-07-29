import express from "express";
import { getSubmissionByUser } from "../controllers/submission";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth, getSubmissionByUser);

export default router;
