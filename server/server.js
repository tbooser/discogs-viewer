"use strict";

const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const routes = express.Router();
const path = require("path");
const musicController = require("./api/musicController");
// const host = "0.0.0.0";

// routes.get("/", function(req, res) {
// 	res.sendFile(path.join(__dirname + "/build"));
// });

const staticFiles = express.static(path.join(__dirname, "../build"));
app.use(staticFiles);

app.get("/music", musicController.getMusicByCollection);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../build/index.html"));
});

// if (process.env.NODE_ENV === "production") {
// 	app.use(staticFiles);
// }

// const server = app.listen(process.env.PORT, () => {
// 	console.log("Listening on port " + server.address().port);
// });

// console.log(__dirname, "__dirname");
app.listen(port, function() {
	console.log("Server started.........");
});
