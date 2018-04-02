"use strict";

const config = require("./config");
const express = require("express");
const app = express();
const routes = express.Router();
const Path = require("path");
const bodyParser = require("body-parser");
const _ = require("underscore");

const Discogs = require("disconnect").Client;
const dis = new Discogs(config);
const db = dis.database();
const col = dis.user().collection();
const wantList = dis.user().wantlist();

const assetFolder = Path.resolve(__dirname, "../public");
routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== "test") {
  routes.get("/*", function(req, res) {
    res.sendFile(assetFolder + "/index.html");
  });
}

//Routes
const musicController = require("./api/musicController");

app.get("/music", musicController.getMusicByCollection);
app.post("/id", musicController.getMusicById);
app.use(require("body-parser").json());
app.use(bodyParser.text({ type: "text/html" }));
app.use("/", routes);

const server = app.listen(3001, () => {
  console.log("Listening on port " + server.address().port);
});

routes.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
