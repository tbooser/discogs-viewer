import { useEffect } from 'react';
import ListTypeToggle from '../ListTypeToggle';

interface ControlPanelProps {
  listType: string;
  listTypeClickHandler: (event: any) => void;
  collectionSize: number;
  wantlistSize: number;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { listType, listTypeClickHandler, collectionSize, wantlistSize } = props;
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
    </div>
  );
};

export default ControlPanel;
