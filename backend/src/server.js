import express from "express";
import { connectDB } from "./database/config.js";
import { getHome } from "./controllers/home.js";
import {
  createNote, 
  getNotes,
  openNote,
  postNote,
} from "./controllers/notes.js";

const app = express();
app.set("view engine", "ejs");

app.use(express.json());
connectDB();
// app.use(express.urlencoded({ extended: true }));

app.get("/", getHome);

app.route("/notes").get(getNotes).post(postNote);

app.get("/notes/:id", openNote);

app.get("/createNote", createNote);

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
