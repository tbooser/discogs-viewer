import { useState } from 'react';

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
  wantlist: Array<RecordItemType>;
  wantlistSize: number;
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
      const response = await fetch('/collection', {
        method: 'GET',
      });
      const response_json = await response.json();
      setIsSuccessful(true);
      return response_json;
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsPending(false);
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
