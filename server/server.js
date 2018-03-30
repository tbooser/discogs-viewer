const config = require('./config')
      express = require('express')
      app = express()
      routes = express.Router()
      Path = require('path')
      bodyParser = require('body-parser')
       _ = require('underscore')
      
      Discogs = require('disconnect').Client
      dis = new Discogs(config)
      db = dis.database()
      col = dis.user().collection()
      wantList = dis.user().wantlist()



const assetFolder = Path.resolve(__dirname, '../public');
  routes.use(express.static(assetFolder));

if (process.env.NODE_ENV !== 'test') {
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })
}

//Routes
const musicController = require('./api/musicController')

app.get('/music',  musicController.getMusicByCollection)
app.post('/id',    musicController.getMusicById)


app.use(require('body-parser').json() )
  app.use(bodyParser.text({type: 'text/html'})) 
app.use('/', routes);

const server = app.listen(3001, () => {
  console.log('Listening on port ' + server.address().port)
})


routes.get('/', function (req, res) {
  res.sendFile(path.join( __dirname + '/dist/index.html' ))
});

