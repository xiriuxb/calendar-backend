import * as jwt from "jsonwebtoken";
declare module "jsonwebtoken" {
  export interface JwtPayload extends jwt.JwtPayload {
    uid?: string;
    name?: string;
    // Add any other custom properties you need
  }
}

export {};
