import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DiscogsTable from '../DiscogsTable';
import MusicPlayerBar from '../MusicPlayerBar';
import { RootState } from '../../reducers';

const DiscogsTableContainer = () => {
  const [successfulFetch, setSuccessfulFetch] = useState(false);
  const requestSuccessState = useSelector((state: RootState) => state.requestSuccessfulReducer);
  const { requestSuccessful } = requestSuccessState;

  const isMountedHandler = () => {
    console.log('mounted');
    setSuccessfulFetch(true);
  };

  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable isMountedHandler={isMountedHandler} />
      {successfulFetch === true ? <MusicPlayerBar key={Math.random()} /> : null}
    </div>
  );
};

export default DiscogsTableContainer;
