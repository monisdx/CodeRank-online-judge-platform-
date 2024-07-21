import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const dirOutputs = path.join(__dirname, "outputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true }); // recursive:true -> create nested directories Without recursive: true, fs.mkdirSync('path/to/directory') would fail if path/to does not exist.
}

export const executeCode = async (filePath: string) => {
  console.log("filepath: ", filePath);
  const codeId = path.basename(filePath).split(".")[0];
  // const output_filename = `${codeId}.out`;

  const outputPath = path.join(dirOutputs, `${codeId}.exe`);
  console.log("outputpath: ", outputPath);
  // console.log(outputPath);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputPath} && cd ${dirOutputs} && .\\${codeId}.exe`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};
