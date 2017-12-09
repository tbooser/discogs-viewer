const express = require('express'),
      app = express(),
      routes = express.Router(),
      request = require('request')
      Discogs = require('disconnect').Client
			db = new Discogs().database(),
			col = new Discogs().user().collection(),
			Path = require('path')
      bodyParser = require('body-parser')

const assetFolder = Path.resolve(__dirname, '../public');
  routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })
}

app.get('/music', function(req, res){
	col.getReleases('tboos', 0, {page: 1, per_page: 75}, function(err, data){
		console.log('data releases:', data.releases);
		res.send(data.releases);
	});
})

app.use( require('body-parser').json() )
app.use(bodyParser.text({type: 'text/html'}))
app.use('/', routes);

const server = app.listen(3001, () => {
  console.log('Listening on port ' + server.address().port)
})



routes.get('/', function (req, res) {
  res.sendFile(path.join( __dirname + '/dist/index.html' ));
});

