import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirInputs = path.join(__dirname, "input");

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true }); // recursive:true -> create nested directories Without recursive: true, fs.mkdirSync('path/to/directory') would fail if path/to does not exist.
}

export const generateInputFile = async (input: string) => {
  const codeId = uuid();
  const input_filename = `${codeId}.txt`;

  const input_filePath = path.join(dirInputs, input_filename);

  fs.writeFileSync(input_filePath, input);

  return input_filePath;
};
