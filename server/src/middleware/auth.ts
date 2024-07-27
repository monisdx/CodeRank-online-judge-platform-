import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    let decodeData;

    if (token) {
      decodeData = jwt.verify(token, process.env.SECRET_KEY || "test") as {
        email: string;
        id: string;
      };
      console.log(decodeData);
      req.userId = decodeData?.id;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default auth;
