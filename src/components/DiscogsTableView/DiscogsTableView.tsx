import { useEffect } from 'react';
import ListTypeToggle from '../ListTypeToggle';
import MusicPlayerBar from '../MusicPlayerBar';

interface DiscogsTableViewProps {
  collection: JSX.Element[] | undefined;
  listType: string;
  listTypeClickHandler: (event: any) => void;
  collectionSize: number;
  wantlistSize: number;
}

const DiscogsTableView = (props: DiscogsTableViewProps) => {
  const { collection, listType, listTypeClickHandler, collectionSize, wantlistSize } = props;
  const listTypeButtons = document.querySelectorAll('.list-view__type span');

  useEffect(() => {
    listTypeButtons.forEach((button) => {
      console.log(button);
      if (button.classList.contains(listType)) {
        button.classList.add('selected');
      }
    });
  }, []);

  return (
    <div className="list-view__collection-container">
      <div className="list-view__sort-bar">
        <div className="list-view__type">
          <ListTypeToggle
            listTypeClickHandler={listTypeClickHandler}
            listType={listType}
            collectionSize={collectionSize}
            wantlistSize={wantlistSize}
          />
        </div>
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
