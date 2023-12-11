import express from "express";
import {
  createUser,
  loginUser,
  revalidateToken,
} from "../controllers/auth.controller";
const router = express.Router();
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/validator.middleware";
import JWTvalidator from "../middlewares/jwtvalidator.middleware";

router.use(express.json());

// router.get('/',);

router.post(
  "/new",
  [
    check("name", "El campo es obligatorio").notEmpty(),
    check("email", "Debe ser un email válido").isEmail().notEmpty(),
    check("password", "El password ebe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Debe ser un email válido").isEmail().notEmpty(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", JWTvalidator, revalidateToken);

export default router;
