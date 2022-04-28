'use strict';

const port = process.env.PORT || 9000;
const express = require('express');
const app = express();
const routes = express.Router();
const path = require('path');
const musicController = require('./api/musicController.ts');

const staticFiles = express.static(path.join(__dirname, '../build'));
app.use(staticFiles);

app.get('/music', (req: any, res: any) => {
  console.log('hit /music');
  musicController.getMusicByCollection(req, res);
});

app.get('*', (_req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, function () {
  console.log(`Server started at http://localhost:${port}`);
});
