import path from "path";
import fs from "fs";
import { fileType } from "./FormatFiles";

export const writeToFile = (email: string, data: fileType) => {
  console.log(path.join(__dirname + `/../uploads/${email}/${data.fileName}`));
  if (
    fs.existsSync(
      path.join(__dirname + `/../uploads/${email}/${data.fileName}`)
    )
  ) {
    fs.writeFileSync(
      path.join(__dirname + `/../uploads/${email}/${data.fileName}`),
      data.content
    );
  } else {
    console.log("file not found");
  }
};

export const ReadFromFile = (email: string, data: fileType) => {
  if (
    fs.existsSync(
      path.join(__dirname + `/../uploads/${email}/${data.fileName}`)
    )
  ) {
    const read = fs.readFileSync(
      path.join(__dirname + `/../uploads/${email}/${data.fileName}`),
      { encoding: "utf8" }
    );
    data.content = read;
  }
  return data;
};
