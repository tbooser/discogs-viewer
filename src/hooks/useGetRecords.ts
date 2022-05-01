import { useState } from 'react';

interface getRecordsCollectionByUsernameReturnTypes extends Array<any> {
  response: Array<object>; // Don't use object
}

interface useGetRecordsReturnTypes {
  isPending: boolean;
  isSuccessful: boolean;
  isFailed: boolean;
  getRecordsCollectionByUsername: () => Promise<getRecordsCollectionByUsernameReturnTypes>;
  getRecordsWantlistByUsername: () => Promise<getRecordsCollectionByUsernameReturnTypes>;
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

  const getRecordsWantlistByUsername = async () => {
    setIsPending(true);
    setIsSuccessful(false);
    setIsFailed(false);

    try {
      const response = await fetch('/wantlist', {
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

    return;
  };

  return {
    isPending,
    isSuccessful,
    isFailed,
    getRecordsCollectionByUsername,
    getRecordsWantlistByUsername,
  };
};

export default useGetRecords;
