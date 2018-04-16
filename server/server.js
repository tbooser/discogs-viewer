"use strict";

const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const routes = express.Router();
const path = require("path");
const musicController = require("./api/musicController");

const staticFiles = express.static(path.join(__dirname, "../build"));
app.use(staticFiles);

app.get("/music", musicController.getMusicByCollection);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, function() {
	console.log("Server started.........");
});
