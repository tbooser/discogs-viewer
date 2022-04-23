import React from 'react';
import { useDispatch } from 'react-redux';
import { RECEIVE_YOUTUBE_VIDEOS_ERROR, RECEIVE_YOUTUBE_VIDEOS_SUCCESS } from '../../constants';

interface RecordCollectionItemProps {
  id: number;
  key: number;
  resource_url: string;
  imgSrc: string;
  artistName: string;
  recordTitle: string;
  label: string;
  year: number;
}

const RecordCollectionItem = (props: RecordCollectionItemProps) => {
  const { resource_url, imgSrc, artistName, recordTitle, label, year } = props;
  // const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const fetchYoutubeVideos = async (resource_url: RequestInfo, img_url: any) => {
    // TODO: Add isFetching action
    try {
      const response = await fetch(resource_url, {
        method: 'GET',
      });
      const response_json = await response.json();
      dispatch({ type: RECEIVE_YOUTUBE_VIDEOS_SUCCESS, response_json, img_url });
    } catch (error) {
      dispatch({ type: RECEIVE_YOUTUBE_VIDEOS_ERROR, error });
    }
  };

  const handleOnClick = () => {
    fetchYoutubeVideos(resource_url, imgSrc);
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
      <span onClick={handleOnClick}>
        <i className="fas fa-headphones" />
      </span>
    </div>
  );
};

export default RecordCollectionItem;
