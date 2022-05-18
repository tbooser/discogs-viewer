'use strict';

import writeToFile from '../utils/writeToFile';

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

const processResponse = (data: { id: number; basic_information: any }[]) => {
  const arr: any = [];
  data.forEach((record: { id: number; basic_information: any }) => {
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

    arr.push(recordResponseObject);
  });

  return arr;
};

exports.getMusicByCategory = (
  _req: any,
  res: {
    send: (arg0: {
      collection: undefined;
      collectionSize: undefined;
      wantlist: undefined;
      wantlistSize: undefined;
    }) => void;
  }
) => {
  const responseObject = {
    collection: undefined,
    collectionSize: undefined,
    wantlist: undefined,
    wantlistSize: undefined,
  };

  const collectionData = discogsCollection
    .getReleases(username, 0, { page: 1, per_page: 400 })
    .then((data: any) => {
      const { releases, pagination } = data;
      const processedReleases = processResponse(releases);
      const collectionSize = pagination.items;
      responseObject.collection = processedReleases;
      responseObject.collectionSize = collectionSize;
      return { processedReleases, collectionSize };
    })
    .catch((error: any) => {
      console.log('error with collection data request', error);
      writeToFile(error, 'collection_data_request_error.txt');
    });

  const wantlistData = discogsWantlist
    .getReleases(username, { page: 1, per_page: 400 })
    .then((data: any) => {
      const { wants, pagination } = data;
      const processedReleases = processResponse(wants);
      const wantlistSize = pagination.items;
      responseObject.wantlist = processedReleases;
      responseObject.wantlistSize = wantlistSize;
      return { processedReleases, wantlistSize };
    })
    .catch((error: any) => {
      console.log('error with wantlist data request', error);
      writeToFile(error, 'wantlist_data_request_error.txt');
    });

  Promise.all([collectionData, wantlistData])
    .then(() => {
      res.send(responseObject);
    })
    .catch((error) => {
      console.log('err', error);
      writeToFile(error, 'request_error.txt');
    });
};
