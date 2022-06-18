import { useEffect, useRef, useState } from 'react';
import RecordCollectionItem from '../RecordCollectionItem';
import DiscogsTableView from '../DiscogsTableView';
import Loading from '../Loading';
import useGetRecords, { getRecordsCollectionByUsernameReturnTypes, RecordItemType } from '../../hooks/useGetRecords';

const DiscogsTable = (): any => {
  const [immutableCollectionList, setImmutableCollectionList] = useState<
    any | getRecordsCollectionByUsernameReturnTypes
  >();
  const [immutableWantlist, setImmutableWantlist] = useState<any | getRecordsCollectionByUsernameReturnTypes>();
  // List sizes
  const [collectionSize, setCollectionSize] = useState<number>(0);
  const [wantlistSize, setWantlistSize] = useState<number>(0);
  // Lists
  const [collectionList, setCollectionList] = useState<any | getRecordsCollectionByUsernameReturnTypes>();
  const [wantlist, setWantlist] = useState<any | getRecordsCollectionByUsernameReturnTypes>();
  // Genres by list
  const [collectionGenres, setCollectionGenres] = useState<Array<string>>([]);
  const [wantlistGenres, setWantlistGenres] = useState<Array<string>>([]);
  // Current list type
  const [listType, setListType] = useState<string>('collection');
  // List of the currently rendered records
  const [collectionCurrentlyRendered, setCollectionCurrentlyRendered] = useState<number>(50);
  const [wantlistCurrentlyRendered, setWantlistCurrentlyRendered] = useState<number>(50);
  // List of the currently selected genres
  const [collectionCurrentGenres, setCollectionCurrentGenres] = useState<Array<string> | undefined>(undefined);
  const [wantlistCurrentGenres, setWantlistCurrentGenres] = useState<Array<string> | undefined>(undefined);

  const { getRecordsCollectionByUsername, isPending, isSuccessful } = useGetRecords();
  const isMountedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(isMountedRef);

  useEffect(() => {
    const getRecords = async () => {
      return await getRecordsCollectionByUsername();
    };

    getRecords().then((response_json) => {
      const { collection, collectionSize, collectionGenres, wantlist, wantlistSize, wantlistGenres } = response_json;

      setCollectionList(collection);
      setImmutableCollectionList(collection);
      setCollectionSize(collectionSize);
      setWantlist(wantlist);
      setImmutableWantlist(wantlist);
      setWantlistSize(wantlistSize);
      setCollectionGenres(collectionGenres);
      setWantlistGenres(wantlistGenres);
    });
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const currentList = listType === 'collection' ? immutableCollectionList : immutableWantlist;
      const currentGenresList = listType === 'collection' ? collectionCurrentGenres : wantlistCurrentGenres;

      const filteredList = currentList.filter((record: { styles: string[] }) => {
        return currentGenresList?.every((t) => {
          return record.styles.includes(t);
        });
      });
      listType === 'collection' ? setCollectionList(filteredList) : setWantlist(filteredList);
    } else {
      isMounted.current = true;
    }
  }, [collectionCurrentGenres, wantlistCurrentGenres]);

  const infiniteScrollHandler = () => {
    listType === 'collection'
      ? setCollectionCurrentlyRendered(collectionCurrentlyRendered + 50)
      : setWantlistCurrentlyRendered(wantlistCurrentlyRendered + 50);
  };

  const listTypeClickHandler = (event: any) => {
    event.preventDefault();
    const currentListType = event.target.dataset.name;
    currentListType === 'collection' ? setCollectionList(immutableCollectionList) : setWantlist(immutableWantlist);
    setListType(currentListType);

    const recordList = document.querySelector('.list-view__record-list');
    recordList!.scrollTo(0, 0);
  };

  const genreClickHandler = (event: any) => {
    event.preventDefault();
    const currentGenre = event.currentTarget.dataset.genre;
    const currentGenresState = listType === 'collection' ? collectionCurrentGenres : wantlistCurrentGenres;
    let genresArray = currentGenresState === undefined ? [] : currentGenresState;

    if (!event.target.classList.contains('selected')) {
      event.target.classList.add('selected');
      genresArray = [...genresArray];
      genresArray.push(currentGenre);
    } else {
      event.target.classList.remove('selected');
      genresArray = [...genresArray].filter((genre) => genre !== currentGenre);
    }
    return listType === 'collection' ? setCollectionCurrentGenres(genresArray) : setWantlistCurrentGenres(genresArray);
  };

  const renderCollection = () => {
    let list: Array<RecordItemType> = listType === 'collection' ? collectionList : wantlist;

    return list.map((record, index) => {
      const { id, resource_url, cover_image, artists, title, labels, year, styles } = record;
      return (
        <RecordCollectionItem
          id={id}
          key={index}
          index={index}
          year={year}
          recordTitle={title}
          imgSrc={cover_image}
          label={labels[0].name}
          resource_url={resource_url}
          artistName={artists[0].name}
          styles={styles}
          collectionCurrentlyRendered={collectionCurrentlyRendered}
          wantlistCurrentlyRendered={wantlistCurrentlyRendered}
          infiniteScrollHandler={infiniteScrollHandler}
          listType={listType}
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
        collectionGenres={collectionGenres}
        wantlistGenres={wantlistGenres}
        genreClickHandler={genreClickHandler}
      />
    );
  }

  return <div></div>;
};

export default DiscogsTable;
