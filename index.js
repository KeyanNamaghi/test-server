const express = require("express");
const path = require("path");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const db = lowDb(new FileSync(path.join(__dirname, "./db.json")));

db.defaults({ translations: [] }).write();

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("🏃‍♂️ server running...");
});

app.get("/translations", (req, res) => {
  const data = db.get("translations").value();
  return res.json(data);
});

app.get("/translations/search", (req, res) => {
  const data = db.get("translations").value();

  for (entry of data) {
    if (req.query.word === Object.keys(entry)[0]) {
      return res.json(entry);
    }
  }

  return res.json(null);
});

app.post("/translations/new", (req, res) => {
  const translation = req.body;
  db.get("translations")
    .push({
      ...translation
    })
    .write();
  res.json({ success: true });
});

app.listen(app.get("port"), () => {
  console.log(`Server started on port: 5000 🚀`);
  console.log(`process.env.PORT :${process.env.PORT} 🥳`);
});
