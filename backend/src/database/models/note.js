import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    contents: { type: String, required: true },
  },
  {
    timestamp: { type: Date, default: Date.now },
  }
);

export const Note = new model ("singleNote", noteSchema)
