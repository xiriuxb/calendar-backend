import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import '../types/express'

const JWTvalidator = (req: Request, res: Response, next: NextFunction) => {
  // x-token en el header
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({ ok: false, msg: "Token not found." });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED!) as JwtPayload;
    req.uid = payload.uid;
    req.uname = payload.name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "No valid Token",
    });
  }
};

export default JWTvalidator;
