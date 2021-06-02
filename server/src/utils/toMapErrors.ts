/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ValidationError } from "class-validator";

export const toMapErrors = (errors: ValidationError[]) => {
  const errorMap: Record<string, string> = {};

  errors.map((error) => {
    console.log(error);
    errorMap[error.property] = Object.values(error.constraints!)[0] as string;
  });

  return { errorMap };
};
