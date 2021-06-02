import { classToPlain } from "class-transformer";
import { User } from "./../components/User/model";

export const formatUser = (user: User) => {
  return <User>classToPlain(user);
};
