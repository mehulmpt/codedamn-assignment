import { Request } from "express";
import { User } from "./../components/User/model";
export type AuthRequest = Request & { user?: User };
