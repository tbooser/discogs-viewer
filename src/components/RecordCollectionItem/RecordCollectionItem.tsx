import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface RecordCollectionItemProps {
  id: number;
  key: number;
  actions: any;
  resource_url: string;
  imgSrc: string;
  artistName: string;
  recordTitle: string;
  label: string;
  year: number;
}

const RecordCollectionItem = (props: RecordCollectionItemProps) => {
  const { actions, resource_url, imgSrc, artistName, recordTitle, label, year } = props;
  const { recordActions } = actions;
  const { fetchYoutubeVideos } = recordActions;
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const getYoutubeVideos = (event) => {
    dispatch(fetchYoutubeVideos(resource_url, imgSrc));
  };

  return (
    <div className="list-view__record-item">
      <span>
        <img alt="record-album-cover" className="record-table-item-image" src={imgSrc} />
      </span>
      <span className="record-table-item-info">{artistName}</span>
      <span className="record-table-item-info">{recordTitle}</span>
      <span className="record-table-item-info">{label}</span>
      <span className="record-table-item-info">{year}</span>
      <span onClick={getYoutubeVideos}>
        <i className="fas fa-headphones" />
      </span>
    </div>
  );
};

export default RecordCollectionItem;
