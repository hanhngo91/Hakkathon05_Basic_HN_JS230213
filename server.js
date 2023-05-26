const express = require("express");
const server = express();
const cors = require("cors");
const PORT = 3001;

const database = require("./mySQL_Connection");
const bodyParser = require("body-parser");

//Import Middleware:
const checkData = require("./middlewares/checkData");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//Get all notes from database
server.get("/notes", (req, res) => {
  database.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Get notes failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

//Create new note:
server.post("/notes", checkData, (req, res) => {
  const { Content } = req.body;
  const newNote = [Content];

  const query = "INSERT INTO notes (content) VALUES (?)";
  database.query(query, newNote, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Create note failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Create note successfully",
        data: newNote,
      });
    }
  });
});

//Delete a note:
server.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM notes WHERE Note_id = ${id}`;
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Delete note failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Deleted note successfully",
      });
    }
  });
});

server.listen(PORT, (err, res) => {
  console.log(`http://localhost:${PORT}`);
});
