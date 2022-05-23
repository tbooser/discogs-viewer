import React, { useEffect, useState } from 'react';
import DiscogsTable from '../DiscogsTable';
import LoadingSpinner from '../Loading';
import MusicPlayerBar from '../MusicPlayerBar';

const DiscogsTableContainer = () => {
  const [isFetching, setIsFetching] = useState(true);

  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable />
      <MusicPlayerBar key={Math.random()} />
    </div>
  );
};

export default DiscogsTableContainer;
