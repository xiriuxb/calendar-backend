import { Response, Request } from "express";

export const getEvents = (req: Request, res: Response) => {
  res.json([
    { ok: true, id: "23123" },
    { ok: false, id: "asd" },
  ]);
};

export const addEvent = (req: Request, res: Response) => {
  res.json({ ok: true, msg: "crear evnetos" });
};

export const updateEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ ok: true, msg: "update event", id: id });
};

export const deleteEvent = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ ok: true, msg: "delete event" });
};
