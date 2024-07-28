import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import {
  executeCpp,
  executeC,
  executeJava,
  executePython,
} from "../utils/executeCode";
import { generateInputFile } from "../utils/generateInputFile";

export const runCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, input } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  try {
    const filePath = await generateFile(language, code);
    const input_filePath = await generateInputFile(input);
    let output;

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
  } catch (err: any) {
    res.status(500).json({ message: err.stserr || "something went wrong" });
  }
};

export const submitCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, testcases } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

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
        return res.status(200).json({
          testresults,
          verdict: `wrong answer on testcase ${index}`,
          status: false,
        });
      }

      index++;
    }

    res.status(200).json({ testresults, verdict: "accepted", status: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
