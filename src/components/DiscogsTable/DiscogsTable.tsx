import { useEffect, useState } from 'react';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import Loading from '../Loading';
import useGetRecords, { getRecordsCollectionByUsernameReturnTypes, RecordItemType } from '../../hooks/useGetRecords';

const initialRecordsState: getRecordsCollectionByUsernameReturnTypes = {
  collection: [],
  collectionSize: 0,
  wantlist: [],
  wantlistSize: 0,
};

const DiscogsTable = (): any => {
  const [collectionList, setCollectionList] = useState<any | getRecordsCollectionByUsernameReturnTypes>();
  const [collectionSize, setCollectionSize] = useState<number>(0);
  const [wantlist, setWantlist] = useState<any | getRecordsCollectionByUsernameReturnTypes>();
  const [wantlistSize, setWantlistSize] = useState<number>(0);
  const [listType, setListType] = useState<string>('collection');
  const { getRecordsCollectionByUsername, isPending, isSuccessful, isFailed } = useGetRecords();

  useEffect(() => {
    const getRecords = async () => {
      return await getRecordsCollectionByUsername();
    };

    getRecords().then((response_json) => {
      const { collection, collectionSize, wantlist, wantlistSize } = response_json;
      setCollectionList(collection);
      setCollectionSize(collectionSize);
      setWantlist(wantlist);
      setWantlistSize(wantlistSize);
    });
  }, []);

  useEffect(() => {}, [listType]);

  const listTypeClickHandler = (event: any) => {
    event.preventDefault();
    const currentListType = event.target.dataset.name;
    setListType(currentListType);
  };

  const renderCollection = () => {
    let list: Array<RecordItemType> = listType === 'collection' ? collectionList : wantlist;

    return list.map((record, index) => {
      const { id, resource_url, cover_image, artists, title, labels, year, styles } = record;

      return (
        <RecordCollectionItem
          id={id}
          key={index}
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
        collectionSize={collectionSize}
        wantlistSize={wantlistSize}
      />
    );
  }

  return <div></div>;
};

export default DiscogsTable;
