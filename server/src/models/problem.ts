import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  inputformat: String,
  outputformat: String,
  constraints: String,
  exampleinput: String,
  exampleoutput: String,
  testcases: [{ input: String, expectedoutput: String }],
});

const Problem = mongoose.model("Problem", ProblemSchema);
export default Problem;
