import express from "express";
import { runCode } from "../controllers/compiler";

const router = express.Router();

router.post("/run", runCode);

export default router;
