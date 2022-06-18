import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useRef } from 'react';
import ListTypeToggle from '../ListTypeToggle';

interface ControlPanelProps {
  listType: string;
  listTypeClickHandler: (event: any) => void;
  collectionSize: number;
  wantlistSize: number;
  collectionGenres: Array<string>;
  wantlistGenres: Array<string>;
  genreClickHandler: (event: any) => void;
}

const ControlPanel = (props: ControlPanelProps) => {
  const {
    listType,
    listTypeClickHandler,
    collectionSize,
    wantlistSize,
    collectionGenres,
    wantlistGenres,
    genreClickHandler,
  } = props;
  const genreCloudRef: any = useRef<HTMLDivElement>();
  const listTypeButtons = document.querySelectorAll('.list-view__type span');

  useEffect(() => {
    listTypeButtons.forEach((button) => {
      if (button.classList.contains(listType)) {
        button.classList.add('selected');
      }
    });
  }, []);

  useEffect(() => {
    const selected = Array.from(genreCloudRef.current.children).filter((genre: any) =>
      genre.classList.contains('selected')
    );
    selected.forEach((button: any) => button.classList.remove('selected'));
  }, [listType]);

  const renderGenresCloud = (genresList: any) => {
    return genresList
      .sort((a: number[], b: number[]) => {
        return b[1] - a[1];
      })
      .map((genre: (string | number)[], index: Key | null | undefined) => {
        return (
          <span
            key={index}
            onClick={genreClickHandler}
            className="list-view__control-panel-genre-cloud-item"
            data-genre={genre[0]}
          >
            {genre[0]}&nbsp;<span>{genre[1]}</span>
          </span>
        );
      });
  };

  return (
    <div className="list-view__control-panel">
      <span className="list-view__title">
        <h1>Discogs</h1>
      </span>
      <div className="list-view__type">
        <ListTypeToggle
          listTypeClickHandler={listTypeClickHandler}
          listType={listType}
          collectionSize={collectionSize}
          wantlistSize={wantlistSize}
        />
      </div>
      <div className="list-view__control-panel-genre-cloud" ref={genreCloudRef}>
        {renderGenresCloud(listType === 'collection' ? collectionGenres : wantlistGenres)}
      </div>
    </div>
  );
};

export default ControlPanel;
