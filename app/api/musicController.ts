'use strict';

import writeToFile from '../utils/writeToFile';

const config = require('./config');
const Discogs = require('disconnect').Client;
const dis = new Discogs(config);
const discogsCollection = dis.user().collection();
const discogsWantlist = dis.user().wantlist();
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

interface ResponseObjectTypes {
  collection: undefined | any;
  collectionSize: undefined | number;
  collectionGenres: undefined | Array<any>;
  wantlist: undefined | any;
  wantlistSize: undefined | number;
  wantlistGenres: undefined | Array<any>;
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

const processGenres = (data: { id: number; basic_information: any }[]) => {
  const stylesObject: Record<string, number> = {};
  data.forEach((record: { id: number; basic_information: any }) => {
    const { basic_information } = record;
    const { styles } = basic_information;

    styles.forEach((style: any) => {
      if (stylesObject[style]) {
        stylesObject[style] = stylesObject[style] + 1;
      } else {
        stylesObject[style] = 1;
      }
    });
  });

  return stylesObject;
};

exports.getMusicByCategory = (_req: any, res: { send: (arg0: ResponseObjectTypes) => void }) => {
  const responseObject: ResponseObjectTypes = {
    collection: undefined,
    collectionSize: undefined,
    collectionGenres: undefined,
    wantlist: undefined,
    wantlistSize: undefined,
    wantlistGenres: undefined,
  };

  const collectionData = discogsCollection
    .getReleases(username, 0, { page: 1, per_page: 400 })
    .then((data: any) => {
      const { releases, pagination } = data;
      const processedReleases = processResponse(releases);
      const collectionGenres: [string, unknown][] = Object.entries(processGenres(releases));
      const collectionSize = pagination.items;
      responseObject.collection = processedReleases;
      responseObject.collectionGenres = collectionGenres;
      responseObject.collectionSize = collectionSize;
      return { processedReleases, collectionGenres, collectionSize };
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
      const wantlistGenres: [string, unknown][] = Object.entries(processGenres(wants));
      const wantlistSize = pagination.items;
      responseObject.wantlist = processedReleases;
      responseObject.wantlistGenres = wantlistGenres;
      responseObject.wantlistSize = wantlistSize;
      return { processedReleases, wantlistGenres, wantlistSize };
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
