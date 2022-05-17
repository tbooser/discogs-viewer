'use strict';

const config = require('./config');
const Discogs = require('disconnect').Client;
const dis = new Discogs(config);
const discogsCollection = dis.user().collection();
const discogsWantlist = dis.user().wantlist();
const username = 'tboos';

const categories: any = {
  collection: discogsCollection,
  wantlist: discogsWantlist,
};

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

interface ResponseObjectTypes {
  collection: Array<RecordResponseTypes>;
  wantlist: Array<RecordResponseTypes>;
}

// const responseObject = {
//   'collection': collection.getReleases(username, 0, { page: 1, per_page: 400 }, callback),
//   'wantlist' : wantlist.getReleases(username, { page: 1, per_page: 400 }, callback),
// }

exports.getMusicByCategory = (_req: any, res: { send: (arg0: any[]) => void }) => {
  let responseObject: any = {
    collection: [],
    wantlist: [],
  };

  const callback = (_err: any, data: { [s: string]: unknown } | ArrayLike<unknown>) => {
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

      responseObject.collection.push(recordResponseObject);
    });
  };

  const wantlistCallback = (_err: any, data: { [s: string]: unknown } | ArrayLike<unknown>) => {
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

      responseObject.wantlist.push(recordResponseObject);
    });
  };

  discogsCollection.getReleases(username, 0, { page: 1, per_page: 400 }, callback);
  discogsWantlist.getReleases(username, { page: 1, per_page: 400 }, wantlistCallback);

  res.send(responseObject);
};

// exports.getMusicByCategory = (_req: any, res: { send: (arg0: any[]) => void }, category: string) => {
//   const reqCategory: any = categories[category];
//   const callback = (_err: any, data: { [s: string]: unknown } | ArrayLike<unknown>) => {
//     const responseArray: Array<RecordResponseTypes> = [];
//     const iterableData: any = Object.entries(data)[1][1];
//     iterableData.forEach((record: { id: number; basic_information: any }) => {
//       const { id, basic_information } = record;
//       const { year, title, cover_image, labels, resource_url, artists, styles } = basic_information;
//       const recordResponseObject: RecordResponseTypes = {
//         id,
//         resource_url,
//         cover_image,
//         artists,
//         title,
//         labels,
//         year,
//         styles,
//       };

//       responseArray.push(recordResponseObject);
//     });

//     res.send(responseArray);
//   };

//   category === 'collection' // Find a cleaner way to do this
//     ? reqCategory.getReleases(username, 0, { page: 1, per_page: 400 }, callback)
//     : reqCategory.getReleases(username, { page: 1, per_page: 400 }, callback);
// };
