import express from "express";
import { runCode, submitCode } from "../controllers/compiler";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/run", auth, runCode);
router.post("/submit", auth, submitCode);

export default router;
