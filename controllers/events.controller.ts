import { Response, Request } from "express";
import Event from "../models/event.model";

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find().populate("user", "name");
  return res.json({ ok: true, events });
};

export const addEvent = async (req: Request, res: Response) => {
  const event = new Event({ ...req.body, user: req.uid });
  try {
    const savedEvent = await event.save();
    return res.status(201).json({ ok: true, event: savedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Hable con el administrador",
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, msg: "El evento no existe" });
    }
    if (event?.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No está autorizado para modificar este evento.",
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    }); //new in option is for receive the updated event

    return res.json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Que alguien llame a alguien",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const uid = req.uid;
    const event = await Event.findById(eventId);
    if (event?.user.toString() !== uid) {
      return res
        .status(401)
        .json({ ok: false, msg: "Not authorized... Calling the police" });
    }
    const delEvent = await Event.deleteOne({ _id: eventId });
    if (!delEvent.deletedCount) {
      return res.status(404).json({ ok: false, msg: "Event not found" });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Que alguien llame a alguien",
    });
  }
};
