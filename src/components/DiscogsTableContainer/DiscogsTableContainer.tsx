import React, { useState } from 'react';
import DiscogsTable from '../DiscogsTable';
import LoadingSpinner from '../Loading';

const DiscogsTableContainer = () => {
  const [isFetching, setIsFetching] = useState(true);

  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable />
    </div>
  );
};

export default DiscogsTableContainer;
