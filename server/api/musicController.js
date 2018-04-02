const config = require("./config");
const _ = require("underscore");
const Discogs = require("disconnect").Client;
const dis = new Discogs(config);
const db = dis.database();
const col = dis.user().collection();
const wantList = dis.user().wantlist();

exports.getMusicByCollection = (req, res) => {
	col.getReleases("tboos", 0, { page: 1, per_page: 300 }, function(err, data) {
		let shuffledArray = _.shuffle(data.releases);
		res.send(shuffledArray);
	});
};

exports.getMusicById = (req, res) => {
	console.log("Getting music by ID");
	db.getRelease(req.body, function(err, data) {
		res.send(data);
	});
};
