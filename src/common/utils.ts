import { AppError } from "./error";

export const unimplemented = () => {
  throw new AppError("Method not implemented.");
};
