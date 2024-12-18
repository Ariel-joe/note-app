import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";


dotenv.config();
const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); 
  }
}

connectDB();

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contents: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { collection: 'singleNote' });

const Note = mongoose.model("singleNote", noteSchema);

app.get("/", (req, res) => {
  res.redirect("/notes");
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.render("notes.ejs", { notes });
  } catch (err) {
    res.status(500).send("Failed to load notes: " + err.message);
  }
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);

    if (!note) {
      res.status(404).render("404.ejs");
      return;
    }

    res.render("singleNote.ejs", { note });
  } catch (err) {
    console.error("Error fetching the note:", err.message);
    res.status(500).send("Failed to load the note");
  }
});

app.get("/createNote", (req, res) => {
  res.render("create-note.ejs");
});

app.post("/notes", async (req, res) => {
  const { title, contents } = req.body;

  try {
    const newNote = new Note({ title, contents });
    await newNote.save();

    res.redirect("/notes");
  } catch (err) {
    console.error("Error creating the note:", err.message);
    res.status(500).send("Failed to create the note");
  }
});

app.use(express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
