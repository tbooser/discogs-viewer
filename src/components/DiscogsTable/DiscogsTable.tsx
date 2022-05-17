import { useEffect, useState } from 'react';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import Loading from '../Loading';
import useGetRecords, { getRecordsCollectionByUsernameReturnTypes } from '../../hooks/useGetRecords';

interface RecordRequestResponseTypes {
  collection: Array<object>;
  wantlist: Array<object>;
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
// Left off refactoring to accommodate both wantlist and collection fields in response
const DiscogsTable = (): any => {
  const [recordsList, setRecordsList] = useState<getRecordsCollectionByUsernameReturnTypes>([]);
  const [listType, setListType] = useState<string>('collection');
  const [collectionListLength, setCollectionListLength] = useState<number>(0);
  const [wantlistLength, setWantlistLength] = useState<number>(0);
  const { getRecordsCollectionByUsername, getRecordsWantlistByUsername, isPending, isSuccessful, isFailed } =
    useGetRecords();

  useEffect(() => {
    const getRecords = async () => {
      const requestFunction = listType === 'collection' ? getRecordsCollectionByUsername : getRecordsWantlistByUsername;
      return await requestFunction();
    };

    getRecords().then((response_json) => {
      console.log(response_json);
      setRecordsList(response_json);
      setCollectionListLength(response_json.length);
    });
  }, [listType]);

  const listTypeClickHandler = (event: any) => {
    event.preventDefault();
    const currentListType = event.target.classList[0];
    setListType(currentListType);
  };

  const renderCollection = () => {
    let list = listType === 'collection' ? recordsList.collection : recordsList.wantlist;
    return list.map((record: RecordItemType) => {
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
    return (
      <DiscogsTableView
        listTypeClickHandler={listTypeClickHandler}
        listType={listType}
        collection={renderCollection()}
        collectionListLength={collectionListLength}
      />
    );
  }

  return <div></div>;
};

export default DiscogsTable;
