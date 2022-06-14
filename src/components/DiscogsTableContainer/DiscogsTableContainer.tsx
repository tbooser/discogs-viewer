import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DiscogsTable from '../DiscogsTable';
import MusicPlayerBar from '../MusicPlayerBar';
import { RootState } from '../../reducers';

const DiscogsTableContainer = () => {
  return (
    <div className="list-view__container-main" key={Math.random()}>
      <DiscogsTable />
      <MusicPlayerBar />
    </div>
  );
};

export default DiscogsTableContainer;
