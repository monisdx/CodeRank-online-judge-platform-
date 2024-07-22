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
