import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller";
import JWTvalidator from "../middlewares/jwtvalidator.middleware";
import router from "./auth.routes";

router.get("/", JWTvalidator, getEvents);

router.post("/", JWTvalidator, addEvent);

router.put("/:id", JWTvalidator, updateEvent);

router.delete("/:id", JWTvalidator, deleteEvent);

export default router;
