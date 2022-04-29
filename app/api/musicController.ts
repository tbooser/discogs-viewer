'use strict';

const config = require('./config');
const Discogs = require('disconnect').Client;
const dis = new Discogs(config);
const col = dis.user().collection();
// const wantList = dis.user().wantlist();
const username = 'tboos';

interface RecordResponseTypes {
  id: number;
  resource_url: string;
  cover_image: string;
  artists: Array<string>;
  title: string;
  labels: Array<string>;
  year: number;
  styles: Array<string>;
}

exports.getMusicByCollection = (_req: any, res: { send: (arg0: any[]) => void }) => {
  col.getReleases(
    username,
    0,
    { page: 1, per_page: 400 },
    (_err: any, data: { [s: string]: unknown } | ArrayLike<unknown>) => {
      const responseArray: Array<RecordResponseTypes> = [];
      const iterableData: any = Object.entries(data)[1][1];

      iterableData.forEach((record: { id: number; basic_information: any }) => {
        const { id, basic_information } = record;
        const { year, title, cover_image, labels, resource_url, artists, styles } = basic_information;
        const recordResponseObject: RecordResponseTypes = {
          id,
          resource_url,
          cover_image,
          artists,
          title,
          labels,
          year,
          styles,
        };

        responseArray.push(recordResponseObject);
      });

      res.send(responseArray);
    }
  );
};
