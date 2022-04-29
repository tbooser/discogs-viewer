import { useEffect, useState } from 'react';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import Loading from '../Loading';

type RecordType = {
  response: Array<object>; // Don't use object
};

type RecordItemType = {
  id: number;
  year: number;
  title: string;
  cover_image: string;
  labels: { name: string }[];
  resource_url: string;
  artists: { name: string }[];
  styles: Array<string>;
};

const DiscogsTable = (): any => {
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
      } catch (error) {
        setIsLoading(false);
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
        const { id, resource_url, cover_image, artists, title, labels, year, styles } = record;

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
            styles={styles}
          />
        );
      });
    }
  };

  return <DiscogsTableView collection={renderCollection()} />;
};

export default DiscogsTable;
