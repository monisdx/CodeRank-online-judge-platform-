import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import {
  executeCpp,
  executeC,
  executeJava,
  executePython,
} from "../utils/executeCode";
import { generateInputFile } from "../utils/generateInputFile";
import { addSubmission } from "./submission";
import { addLeaderBoardUser } from "./users";

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

      res.status(200).json({ output });
    } catch (err) {
      res.status(408).json({ stderr: (err as any).stderr });
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

  if (!["cpp", "c", "py", "java"].includes(language)) {
    return res.status(500).json({
      success: false,
      message: "This Language is not supported",
    });
  }

  try {
    const filePath = await generateFile(language, code);
    let index = 1;
    let testresults = [];

    for (const { input, expectedoutput } of testcases) {
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
        }

        // console.log(`${end - start} ms ${index}`);

        const iscorrect: boolean = output === expectedoutput;

        testresults.push({ testcase: index, status: iscorrect });

        if (!iscorrect) {
          await addSubmission(
            req.userId,
            problem_id,
            false,
            "wrong answer",
            language,
            new Date().toISOString()
          );
          return res.status(200).json({
            testresults,
            verdict: `wrong answer on testcase ${index}`,
            status: false,
          });
        }

        index++;
      } catch (err) {
        return res.status(408).json({ stderr: (err as any).stderr });
      }
    }

    await addSubmission(
      req.userId,
      problem_id,
      true,
      "accepted",
      language,
      new Date().toISOString()
    );

    await addLeaderBoardUser(req.userId, problem_id);

    res.status(200).json({ testresults, verdict: "accepted", status: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
