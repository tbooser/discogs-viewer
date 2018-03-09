	exports.getMusicByCollection = (req, res) => {
		console.log('Getting music by collection')
		col.getReleases('tboos', 0, {page: 1, per_page: 300}, function(err, data){
			res.send(data.releases);
		})
	}

	exports.getMusicById = (req, res) => {
		console.log('Getting music by ID')
		// console.log('request', req)
		db.getRelease(req.body, function(err, data){
    	console.log(data);
    	res.send(data)
  	});
	}