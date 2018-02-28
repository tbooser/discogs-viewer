const express = require('express'),
      app = express(),
      routes = express.Router(),
      request = require('request')
      Discogs = require('disconnect').Client
			db = new Discogs().database(),
			col = new Discogs().user().collection(),

app.get('/id', function(req, res){
  db.getRelease(176126, function(err, data){
    console.log(data);
    res.send(data)
  });
})