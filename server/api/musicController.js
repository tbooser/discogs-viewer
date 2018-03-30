	exports.getMusicByCollection = (req, res) => {
		col.getReleases('tboos', 0, {page: 1, per_page: 300}, function(err, data){
			var	shuffledArray = _.shuffle(data.releases);
			res.send(shuffledArray);
		})

		wantList.getReleases('tboos', 0, {page: 1, per_page: 300}, function(err, data){
			console.log('Getting music by wantlist')
			res.send(data.releases);
			console.log(data)
		})
	}

	exports.getMusicById = (req, res) => {
		console.log('Getting music by ID')
		db.getRelease(req.body, function(err, data){
    	res.send(data)
  	});
	}