import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      uid?: string; // Define your custom property and its type here
      uname?: string;
      // You can add more custom properties as needed
    }
  }
}
export {};
