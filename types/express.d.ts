import { Request } from "express";
declare module "express" {
  export interface Request {
    uid?: string;
    uname?: string;
  }
}

export {};
