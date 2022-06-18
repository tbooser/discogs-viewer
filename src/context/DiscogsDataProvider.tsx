import { createContext, ReactNode, useState } from 'react';
import { API_BASE_URL } from '../constants';

export interface RecordItemType {
  id: number;
  year: number;
  title: string;
  cover_image: string;
  labels: { name: string }[];
  resource_url: string;
  artists: { name: string }[];
  styles: Array<string>;
}

interface CollectionGenres {
  genre: string;
  count: number;
}

export interface DiscogsDataReturnTypes {
  collection: Array<RecordItemType>;
  collectionSize: number;
  collectionGenres: Array<string>;
  wantlist: Array<RecordItemType>;
  wantlistSize: number;
  wantlistGenres: Array<string>;
}

interface DiscogsDataContextProvider {
  children: ReactNode;
}

export const DiscogsDataContext = createContext<DiscogsDataReturnTypes | null>(null);

const DiscogsDataContextProvider = ({ children }: DiscogsDataContextProvider): JSX.Element => {
  const [collection, setCollection] = useState<any | DiscogsDataReturnTypes>();
  const [collectionSize, setCollectionSize] = useState(0);
  const [collectionGenres, setCollectionGenres] = useState<Array<string>>([]);
  const [wantlist, setWantlist] = useState<any | DiscogsDataReturnTypes>();
  const [wantlistSize, setWantlistSize] = useState(0);
  const [wantlistGenres, setWantlistGenres] = useState<Array<string>>([]);

  const getDiscogsData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/collection`, {
        method: 'GET',
      });
      const response_json = await response.json();
      return response_json;
    } catch (error) {
      console.log('request error');
    } finally {
      console.log('all done');
    }

    return {};
  };

  getDiscogsData().then((data) => {
    const { collection, collectionSize, collectionGenres, wantlist, wantlistSize, wantlistGenres } = data;
    console.log(collectionGenres);
    setCollectionSize(collectionSize);
    setCollection(collection);
    setCollectionGenres(collectionGenres);
    setWantlistSize(wantlistSize);
    setWantlist(wantlist);
    setWantlistGenres(wantlistGenres);
  });

  return (
    <DiscogsDataContext.Provider
      value={{
        collection,
        collectionSize,
        collectionGenres,
        wantlist,
        wantlistSize,
        wantlistGenres,
      }}
    >
      {children}
    </DiscogsDataContext.Provider>
  );
};

export default DiscogsDataContextProvider;
