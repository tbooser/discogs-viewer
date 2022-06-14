import { useState } from 'react';
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
export interface getRecordsCollectionByUsernameReturnTypes {
  collection: Array<RecordItemType>;
  collectionSize: number;
  collectionGenres: Array<string>;
  wantlist: Array<RecordItemType>;
  wantlistSize: number;
  wantlistGenres: Array<string>;
}

interface useGetRecordsReturnTypes {
  isPending: boolean;
  isSuccessful: boolean;
  isFailed: boolean;
  getRecordsCollectionByUsername: () => Promise<getRecordsCollectionByUsernameReturnTypes>;
}

const useGetRecords = (): useGetRecordsReturnTypes => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  // const getRecordsCollectionByUsername = async (): Promise<getRecordsCollectionByUsernameReturnTypes> => {
  const getRecordsCollectionByUsername = async () => {
    setIsPending(true);
    setIsSuccessful(false);
    setIsFailed(false);

    try {
      const response = await fetch(`${API_BASE_URL}/collection`, {
        method: 'GET',
      });
      const response_json = await response.json();
      return response_json;
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsPending(false);
      setIsSuccessful(true);
    }

    return {};
  };

  return {
    isPending,
    isSuccessful,
    isFailed,
    getRecordsCollectionByUsername,
  };
};

export default useGetRecords;
