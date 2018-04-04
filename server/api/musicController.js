"use strict";

const config = require("./config");
const Discogs = require("disconnect").Client;
const dis = new Discogs(config);
const db = dis.database();
const col = dis.user().collection();
const wantList = dis.user().wantlist();

exports.getMusicByCollection = (req, res) => {
	col.getReleases("tboos", 0, { page: 1, per_page: 400 }, function(err, data) {
		res.send(data.releases);
	});
};

exports.getMusicById = (req, res) => {
	db.getRelease(req.body, function(err, data) {
		res.send(data);
	});
};
