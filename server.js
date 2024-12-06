import mongoose from "mongoose";
import express from "express";
const app = express();
app.set("view engine", "ejs");

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGOURI = "mongodb+srv://arieljoe00:kWIQGiIOTFYxYaKf@joe.vnl3j.mongodb.net/Notes?retryWrites=true&w=majority&appName=JOE";

// Connecting to the database
async function connectDB() {
  try {
    await mongoose.connect(MONGOURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
}

connectDB();

// Note schema
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    contents: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { collection: 'singleNote' });

const Note = mongoose.model("singleNote", noteSchema);

// Routes
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

const port = 3100;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
