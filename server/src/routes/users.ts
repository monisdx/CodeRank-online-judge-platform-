import express from "express";
import {
  signin,
  signup,
  googleoauth,
  getUserInfo,
} from "../controllers/users.ts";
import auth from "../middleware/auth.ts";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/google-oauth", googleoauth);
router.get("/", auth, getUserInfo);

export default router;
