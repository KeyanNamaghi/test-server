```
cd Documents/Betaworks/
mkdir test-server
cd test-server/
npm init -y
yarn add express cors lowdb nanoid body-parser

touch index.js dockerfile .dockerignore
```

```
code .
```

(if this does work try:
⌘ + ⇧ + P
![](https://i.stack.imgur.com/CZJGA.gif)
)

## index.js file

import the required dependencies

```
const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
```

Create the json database and initialise it

```
const db = lowDb(new FileSync("db.json"));
db.defaults({ notes: [] }).write();
```

Set up and configure express server

```
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 8080;
```

GET request for ./ location

```
app.get("/", (req, res) => {
  return res.send("server running...");
});
```

read from database using GET

```
app.get("/notes", (req, res) => {
  const data = db.get("notes").value();
  return res.json(data);
});
```

write to database using POST

```
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
```

Run server

```app.listen(PORT, () => {
  console.log(`Server started on port:${PORT} 🚀`);
  ascii();
});
```

## dockerfile file

```
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn
# Should do production build but don't have any dev deps yet

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]
```

## .dockerignore file

just need to ignore node_modules

```
node_modules
```

## Running from docker

```
docker build -t betaworks/test-server .
docker run -p 12345:1234 -d alphaworks/test-server
```

can do below if you want to make sure it started running

```
docker ps
docker logs [CONTAINER ID]
```

To stop use:

```
docker stop [CONTAINER ID]
```
