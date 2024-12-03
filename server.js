import express from 'express';
const app = express();
app.set("view engine", "ejs");
import { getNote, getNotes } from './database.js';


app.get("/", (req, res) => {
    res.render("index.ejs")
})


app.get("/notes", (req, res) => {
    const notes = getNotes;
    res.render("notes.ejs", {
        notes
    })
})
app.get("/notes/:id", (req, res) => {
    const id = +req.params.id;
    const note = getNote(id);
    if(!note) {
        res.status(404).render("404.ejs")
        return;
    }
    res.render("singleNote.ejs", {
        note
    })
})


app.get("/createNote", (req, res) => {
    res.render("create-note.ejs")
})

app.post("/notes", (req, res) => {
    
})



app.use(express.static("public") )

const port = 3100
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})