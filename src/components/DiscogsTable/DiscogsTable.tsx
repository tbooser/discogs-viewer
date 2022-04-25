import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import { LOAD_RECORDS_BY_USERNAME_ERROR, LOAD_RECORDS_BY_USERNAME_SUCCESS } from '../../constants';
import Loading from '../Loading';

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

const DiscogsTable = (): any => {
  const dispatch = useDispatch();
  const [recordsList, setRecordsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecordsByUsername = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/music', {
          method: 'GET',
        });
        const response_json = await response.json();
        setRecordsList(response_json);
        setIsLoading(false);
        dispatch({ type: LOAD_RECORDS_BY_USERNAME_SUCCESS, response_json });
      } catch (error) {
        dispatch({ type: LOAD_RECORDS_BY_USERNAME_ERROR, error });
        // Redirect to error message here
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordsByUsername();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const renderCollection = () => {
    if (recordsList.length > 1) {
      return recordsList.map((record: RecordItemType) => {
        const { id, basic_information } = record;
        const { year, title, cover_image, labels, resource_url, artists } = basic_information;
        return (
          <RecordCollectionItem
            id={id}
            key={Math.random()}
            year={year}
            recordTitle={title}
            imgSrc={cover_image}
            label={labels[0].name}
            resource_url={resource_url}
            artistName={artists[0].name}
          />
        );
      });
    }
  };

  return <DiscogsTableView collection={renderCollection()} />;
};

export default DiscogsTable;
