import React from 'react';
import { Route } from 'react-router-dom';
import DiscogsTableContainer from './components/DiscogsTableContainer';

const DiscogsRoutes = () => (
  <div>
    <Route exact path="/" element={<DiscogsTableContainer />} />
  </div>
);

export default DiscogsRoutes;
