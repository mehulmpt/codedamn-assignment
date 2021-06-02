import langData from "../json/Programming_Languages_Extensions.json";

export type fileType = {
  id: number;
  fileName: string;
  language: string;
  content: string;
};

export const FormatFiles = (files: string[]) => {
  const result: fileType[] = [];

  files.forEach((item, index) => {
    const obj: fileType = {
      id: index,
      fileName: item,
      content: "",
      language: "html",
    };
    langData.forEach((lang) => {
      lang.extensions.forEach((ext) => {
        if (ext.toLowerCase() === `.${item.split(".")[1]}`) {
          obj.language = lang.name.toLowerCase();
          return;
        }
      });
    });
    result.push(obj);
  });

  return result;
};
