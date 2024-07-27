import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import { executeCode } from "../utils/executeCode";
import { generateInputFile } from "../utils/generateInputFile";
import { stderr } from "process";

export const runCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, input } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  try {
    const filePath = await generateFile(language, code);
    const input_filePath = await generateInputFile(input);
    const output = await executeCode(filePath, input_filePath);

    res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({ message: err });
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
      const output = await executeCode(filePath, input_filePath);

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
