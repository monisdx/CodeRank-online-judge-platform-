import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./src/routes/users.ts";
import problemRoutes from "./src/routes/problems.ts";
import compilerRoutes from "./src/routes/compiler.ts";
import submissionRoutes from "./src/routes/submission.ts";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb" })); //properly send a request. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use("/auth", userRoutes);
app.use("/problem", problemRoutes);
app.use("/compiler", compilerRoutes);
app.use("/submission", submissionRoutes);
const PORT = Number(process.env.PORT) || 8080;

mongoose
  .connect(process.env.CONNECTION_URL || "")
  .then(() =>
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
