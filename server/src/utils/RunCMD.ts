import { spawnSync } from "child_process";

export const RunCMD = (data: string) => {
  if (data.includes("rm") || data.includes("sudo")) {
    return {
      stdout: "",
      stderr: "",
      error: "you cannot execute this command",
    };
  }
  let format = data.split(" ");
  const firstEle = format[0];
  format.shift();

  const child = spawnSync(firstEle, format);

  return child;
};
