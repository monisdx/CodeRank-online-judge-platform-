import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import {
  executeCpp,
  executeC,
  executeJava,
  executePython,
} from "../utils/executeCode";
import { generateInputFile } from "../utils/generateInputFile";
import Submission from "../models/submission";

export const runCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, input } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  try {
    const filePath = await generateFile(language, code);
    const input_filePath = await generateInputFile(input);
    let output;
    try {
      if (language === "cpp") {
        output = await executeCpp(filePath, input_filePath);
      } else if (language === "c") {
        output = await executeC(filePath, input_filePath);
      } else if (language === "py") {
        output = await executePython(filePath, input_filePath);
      } else if (language === "java") {
        output = await executeJava(filePath, input_filePath);
      } else {
        return res
          .status(500)
          .json({ success: false, message: "This Language is not supported" });
      }
      console.log(output);
      res.status(200).json({ output });
    } catch (err) {
      res.status(402).json({ message: (err as any).stderr });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const submitCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, testcases, problem_id } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  if (!problem_id)
    return res
      .status(500)
      .json({ success: false, message: "Problem id is not found" });

  try {
    const filePath = await generateFile(language, code);
    let index = 1;
    let testresults = [];

    for (const { input, expectedoutput } of testcases) {
      const input_filePath = await generateInputFile(input);
      let output;

      const start = performance.now();
      if (language === "cpp") {
        output = await executeCpp(filePath, input_filePath);
      } else if (language === "c") {
        output = await executeC(filePath, input_filePath);
      } else if (language === "py") {
        output = await executePython(filePath, input_filePath);
      } else if (language === "java") {
        output = await executeJava(filePath, input_filePath);
      } else {
        return res
          .status(500)
          .json({ success: false, message: "This Language is not supported" });
      }
      const end = performance.now();

      // console.log(`${end - start} ms ${index}`);

      const iscorrect: boolean = output === expectedoutput;

      const testresult = {
        testcase: index,
        status: iscorrect ? true : false,
      };

      testresults.push(testresult);

      if (!iscorrect) {
        await Submission.create({
          user_id: req.userId,
          problem_id,
          status: false,
          message: "wrong answer",
          language,
          createdAt: new Date().toISOString(),
        });
        return res.status(200).json({
          testresults,
          verdict: `wrong answer on testcase ${index}`,
          status: false,
        });
      }

      index++;
    }
    await Submission.create({
      user_id: req.userId,
      problem_id,
      status: true,
      message: "accepted",
      language,
      createdAt: new Date().toISOString(),
    });
    res.status(200).json({ testresults, verdict: "accepted", status: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
