import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import { LOAD_RECORDS_BY_USERNAME_ERROR, LOAD_RECORDS_BY_USERNAME_SUCCESS } from '../../constants';

type RecordType = {
  response: Array<object>; // Don't use object
};

type RecordItemType = {
  id: number;
  basic_information: {
    year: number;
    title: string;
    cover_image: string;
    labels: { name: string }[];
    resource_url: string;
    artists: { name: string }[];
  };
};

const DiscogsTable = () => {
  const dispatch = useDispatch();
  const [recordsList, setRecordsList] = useState([]);

  const { records } = useSelector((state: RootState) => state.loadRecordsByUsername);

  useEffect(() => {
    fetchRecordsByUsername();
  });

  useEffect(() => {
    setRecordsList(records);
    console.log('RECORDS!', records);
  }, [records]);

  const fetchRecordsByUsername = async () => {
    try {
      const response = await fetch('/music', {
        method: 'GET',
      });
      const response_json = await response.json();
      dispatch({ type: LOAD_RECORDS_BY_USERNAME_SUCCESS, response_json });
    } catch (error) {
      dispatch({ type: LOAD_RECORDS_BY_USERNAME_ERROR, error });
    }
  };

  const renderCollection = () => {
    // console.log('recordsList', recordsList);
    if (records.length > 1) {
      console.log('sdfsdfs', records);
      return records.map((record: RecordItemType) => {
        return (
          <RecordCollectionItem
            id={record.id}
            key={Math.random()}
            year={record.basic_information.year}
            recordTitle={record.basic_information.title}
            imgSrc={record.basic_information.cover_image}
            label={record.basic_information.labels[0].name}
            resource_url={record.basic_information.resource_url}
            artistName={record.basic_information.artists[0].name}
          />
        );
      });
    }

    return (
      <>
        <DiscogsTableView collection={renderCollection()} />;
      </>
    );
  };
};

export default DiscogsTable;
