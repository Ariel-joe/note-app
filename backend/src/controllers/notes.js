import { Note } from "../database/models/note.js";

// find all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.render("notes.ejs", { notes });
  } catch (err) {
    res.status(500).send("Failed to load notes: " + err.message);
  }
};

// open a single note
export const openNote = async (req, res) => {
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
};

// route for the create note page
export const createNote = async (req, res) => {
  res.render("create-note.ejs");
};

// posting note to the database
export const postNote = async (req, res) => {
  const { title, contents } = req.body; 

  try {
    const newNote = await Note.create({ title, contents });

    return res.redirect("/notes")
  } catch (err) {
    console.error("Error creating the note:", err.message);
    res.status(500).send("Failed to create the note");
  }
};
