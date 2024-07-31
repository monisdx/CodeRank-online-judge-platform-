import express from "express";
import {
  signin,
  signup,
  googleoauth,
  getUserInfo,
  getLeaderBoardUsers,
} from "../controllers/users.ts";
import auth from "../middleware/auth.ts";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/google-oauth", googleoauth);
router.get("/", auth, getUserInfo);
router.get("/leaderboard", getLeaderBoardUsers);

export default router;
