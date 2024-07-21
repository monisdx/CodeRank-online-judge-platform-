import { Request, Response } from "express";
import { generateFile } from "../utils/generateFile";
import { executeCode } from "../utils/executeCode";

export const runCode = async (req: Request, res: Response) => {
  const { language = "cpp", code } = req.body;

  if (!code)
    return res.status(500).json({ success: false, message: "Code is empty" });

  try {
    const filePath = await generateFile(language, code);
    const output = await executeCode(filePath);

    res.json({ filePath, output });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
