"use strict";

const express = require("express");
const app = express();
const musicController = require("./api/musicController");

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.get("/music", musicController.getMusicByCollection);

const server = app.listen(3001, () => {
	console.log("Listening on port " + server.address().port);
});
