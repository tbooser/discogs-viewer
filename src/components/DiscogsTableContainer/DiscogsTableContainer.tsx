import React, { useState } from 'react';
import DiscogsTable from '../DiscogsTable';
import LoadingSpinner from '../Loading';
import MusicPlayerBar from '../MusicPlayerBar';

const DiscogsTableContainer = () => {
  const [isFetching, setIsFetching] = useState(true);

  return (
    <>
      <div className="list-view__container-main" key={Math.random()}>
        <DiscogsTable />
      </div>
      ,
      <MusicPlayerBar key={Math.random()} />,
    </>
  );
};

export default DiscogsTableContainer;
