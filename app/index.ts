'use strict';

const port = process.env.PORT || 9000;
const express = require('express');
const app = express();
const routes = express.Router();
const path = require('path');
const musicController = require('./api/musicController.ts');

const staticFiles = express.static(path.join(__dirname, '../build'));
app.use(staticFiles);

app.get('/collection', (req: any, res: any) => {
  musicController.getMusicByCategory(req, res, 'collection');
});

app.get('/wantlist', (req: any, res: any) => {
  musicController.getMusicByCategory(req, res, 'wantlist');
});

app.get('*', (_req: any, res: { sendFile: (arg0: any) => void }) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, function () {
  console.log(`Server started at http://localhost:${port}`);
});
