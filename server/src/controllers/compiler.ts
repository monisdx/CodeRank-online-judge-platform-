import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import { executeCode } from "../utils/executeCode";
import { generateInputFile } from "../utils/generateInputFile";

export const runCode = async (req: Request, res: Response) => {
  const { language = "cpp", code, input } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  try {
    const filePath = await generateFile(language, code);
    const input_filePath = await generateInputFile(input);
    const output = await executeCode(filePath, input_filePath);

    res.json({ filePath, input_filePath, output });
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
    for (const { input, expectedoutput } of testcases) {
      const input_filePath = await generateInputFile(input);
      const output = await executeCode(filePath, input_filePath);

      console.log("input: ", input);
      console.log("output: ", output);

      const iscorrect: boolean = output === expectedoutput;

      if (!iscorrect) {
        return res.json({
          output,
          verdict: `wrong answer on testcase ${index}`,
        });
      }

      index++;
    }

    res.json({ verdict: "accepted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
