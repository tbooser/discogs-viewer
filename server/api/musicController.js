const express = require('express'),
      app = express(),
      routes = express.Router(),
      request = require('request')
      Discogs = require('disconnect').Client
			db = new Discogs().database(),
			col = new Discogs().user().collection(),

	exports.getMusicByCollection = (req, res) => {
		console.log('Getting music by collection')
		col.getReleases('tboos', 0, {page: 1, per_page: 200}, function(err, data){
			res.send(data.releases);
		})
	}

	exports.getMusicById = (req, res) => {
		console.log('Getting music by ID')
		db.getRelease(176126, function(err, data){
    	console.log(data);
    	res.send(data)
  	});
	}