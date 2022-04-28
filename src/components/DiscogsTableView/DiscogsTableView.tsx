import React from 'react';
import MusicPlayerBar from '../MusicPlayerBar';

interface DiscogsTableViewProps {
  collection: JSX.Element[] | undefined;
}

const DiscogsTableView = (props: DiscogsTableViewProps) => {
  const { collection } = props;

  return (
    <div className="list-view__collection-container">
      <div className="list-view__sort-bar">
        <span></span>
        <span>Artist</span>
        <span>Title</span>
        <span>Label</span>
        <span>Year</span>
        <span>Genres</span>
      </div>
      <div className="list-view__records-container">
        <ul>{collection}</ul>
      </div>
      <MusicPlayerBar key={Math.random()} />
    </div>
  );
};

export default DiscogsTableView;
