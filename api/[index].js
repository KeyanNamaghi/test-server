const express = require("express");
const path = require("path");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const ascii = require("../ascii");

const db = lowDb(new FileSync(path.join(__dirname, "../db.json")));

db.defaults({ notes: [] }).write();

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("🏃‍♂️ server running...");
});

app.get("/notes", (req, res) => {
  const data = db.get("notes").value();
  return res.json(data);
});

app.post("/notes/new", (req, res) => {
  const note = req.body;
  db.get("notes")
    .push({
      ...note,
      id: nanoid()
    })
    .write();
  res.json({ success: true });
});

app.listen(app.get("port"), () => {
  console.log(`Server started on port: 5000 🚀`);
  console.log(`process.env.PORT :${process.env.PORT} 🥳`);
  ascii();
});
