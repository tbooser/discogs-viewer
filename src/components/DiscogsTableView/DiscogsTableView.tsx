import React from 'react';

interface DiscogsTableViewProps {
  collection: JSX.Element | JSX.Element[];
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
      </div>
      {collection}
    </div>
  );
};

export default DiscogsTableView;
