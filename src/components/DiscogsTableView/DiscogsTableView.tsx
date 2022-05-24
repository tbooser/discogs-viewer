import { useEffect } from 'react';
import ControlPanel from '../ControlPanel';

interface DiscogsTableViewProps {
  collection: JSX.Element[] | undefined;
  listType: string;
  listTypeClickHandler: (event: any) => void;
  collectionSize: number;
  wantlistSize: number;
  collectionGenres: Array<string>;
  wantlistGenres: Array<string>;
  genreClickHandler: (event: any) => void;
}

const DiscogsTableView = (props: DiscogsTableViewProps) => {
  const {
    collection,
    listType,
    listTypeClickHandler,
    collectionSize,
    wantlistSize,
    collectionGenres,
    wantlistGenres,
    genreClickHandler,
  } = props;
  const listTypeButtons = document.querySelectorAll('.list-view__type span');

  useEffect(() => {
    listTypeButtons.forEach((button) => {
      if (button.classList.contains(listType)) {
        button.classList.add('selected');
      }
    });
  }, []);

  return (
    <div className="list-view__collection-container">
      <ControlPanel
        listType={listType}
        listTypeClickHandler={listTypeClickHandler}
        collectionSize={collectionSize}
        wantlistSize={wantlistSize}
        collectionGenres={collectionGenres}
        wantlistGenres={wantlistGenres}
        genreClickHandler={genreClickHandler}
      />
      <div className="list-view__records-container">
        <div className="list-view__sort-bar">
          <span></span>
          <span>Artist</span>
          <span>Title</span>
          <span>Label</span>
          <span>Year</span>
          <span>Genres</span>
          <span></span>
        </div>
        <ul>{collection}</ul>
      </div>
    </div>
  );
};

export default DiscogsTableView;
