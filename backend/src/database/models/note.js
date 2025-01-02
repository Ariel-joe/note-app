import { model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    contents: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Note = new model ("singlenote", noteSchema)
