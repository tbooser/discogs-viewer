import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';

type RecordType = {
  response: Array<object>; // Don't use object
};

const DiscogsTable = () => {
  const renderCollection = () => {
    const data = useSelector((state: RootState) => state.loadRecordsByUsername);
    if (data.records.length > 1) {
      data.records.forEach((record: RecordType) => {
        const shuffledRecords = record.response;
        return shuffledRecords.map(
          (item: {
            id: number;
            basic_information: {
              year: number;
              title: string;
              cover_image: string;
              labels: { name: string }[];
              resource_url: string;
              artists: { name: string }[];
            };
          }) => {
            return (
              <RecordCollectionItem
                id={item.id}
                key={Math.random()}
                year={item.basic_information.year}
                recordTitle={item.basic_information.title}
                imgSrc={item.basic_information.cover_image}
                label={item.basic_information.labels[0].name}
                resource_url={item.basic_information.resource_url}
                artistName={item.basic_information.artists[0].name}
              />
            );
          }
        );
      });
    }
  };

  return (
    <>
      <DiscogsTableView collection={renderCollection()} />;
    </>
  );
};

export default DiscogsTable;
