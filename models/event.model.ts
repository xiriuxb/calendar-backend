import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

EventSchema.method("toJSON", function () {
  const o = this.toObject();
  return {
    id: o._id,
    title: o.title,
    start: o.start,
    end: o.end,
    notes: o.notes,
    user: o.user,
  };
});

const Event = model("Event", EventSchema);

export default Event;
