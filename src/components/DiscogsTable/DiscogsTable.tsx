import { useEffect, useState } from 'react';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import Loading from '../Loading';
import useGetRecords from '../../hooks/useGetRecords';

interface getRecordsCollectionByUsernameReturnTypes extends Array<any> {
  response: Array<object>; // Don't use object
}

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
  const [recordsList, setRecordsList] = useState<[] | getRecordsCollectionByUsernameReturnTypes>([]);
  const { getRecordsCollectionByUsername, getRecordsWantlistByUsername, isPending, isSuccessful, isFailed } =
    useGetRecords();

  useEffect(() => {
    const getRecords = async () => {
      return await getRecordsWantlistByUsername();
    };

    getRecords().then((response_json) => {
      setRecordsList(response_json);
    });
  }, []);

  const renderCollection = () => {
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
  };

  if (isPending) {
    return <Loading />;
  }

  if (isSuccessful) {
    return <DiscogsTableView collection={renderCollection()} />;
  }

  return <div></div>;
};

export default DiscogsTable;
