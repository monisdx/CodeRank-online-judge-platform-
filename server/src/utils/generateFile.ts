import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true }); // recursive:true -> create nested directories Without recursive: true, fs.mkdirSync('path/to/directory') would fail if path/to does not exist.
}

export const generateFile = async (language: string, code: string) => {
  const codeId = uuid();
  const filename = `${codeId}.${language}`;

  const filePath = path.join(dirCodes, filename);

  fs.writeFileSync(filePath, code);

  return filePath;
};
