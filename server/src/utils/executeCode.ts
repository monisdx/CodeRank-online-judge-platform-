import fs from "fs";
import path from "path";
import { exec } from "child_process";

const dirOutputs = path.join(__dirname, "outputs");

if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true }); // recursive:true -> create nested directories Without recursive: true, fs.mkdirSync('path/to/directory') would fail if path/to does not exist.
}

export const executeCpp = async (filePath: string, inputPath: string) => {
  const codeId = path.basename(filePath).split(".")[0];

  const outputPath = path.join(dirOutputs, `${codeId}.exe`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputPath} && cd ${dirOutputs} && .\\${codeId}.exe < ${inputPath}`,
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

export const executeC = async (filePath: string, inputPath: string) => {
  const codeId = path.basename(filePath).split(".")[0];

  const outputPath = path.join(dirOutputs, `${codeId}.exe`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outputPath} && cd ${dirOutputs} && .\\${codeId}.exe < ${inputPath}`,
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

export const executePython = async (filePath: string, inputPath: string) => {
  return new Promise((resolve, reject) => {
    exec(`python3 ${filePath} < ${inputPath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};

export const executeJava = async (filePath: string, inputPath: string) => {
  return new Promise((resolve, reject) => {
    exec(
      `javac ${filePath} && java ${filePath} < ${inputPath}`,
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
