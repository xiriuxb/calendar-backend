import { check } from "express-validator";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller";
import JWTvalidator from "../middlewares/jwtvalidator.middleware";
import router from "./auth.routes";
import { fieldValidator } from "../middlewares/validator.middleware";
import isDate from "../helpers/isDate.validator";

router.use(JWTvalidator);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de inicio es obligatoria").custom(isDate),
    fieldValidator,
  ],
  addEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;
