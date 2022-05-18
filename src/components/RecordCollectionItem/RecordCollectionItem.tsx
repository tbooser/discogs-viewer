import { useDispatch } from 'react-redux';
import { receiveYoutubeVideos, receiveYoutubeVideosError } from '../../reducers/Youtube/actionCreators';

interface RecordCollectionItemProps {
  id: number;
  index: number;
  resource_url: string;
  imgSrc: string;
  artistName: string;
  recordTitle: string;
  label: string;
  year: number;
  styles: Array<string>;
  hidden: boolean;
}

const RecordCollectionItem = (props: RecordCollectionItemProps) => {
  const { resource_url, imgSrc, artistName, recordTitle, label, year, styles, index, hidden } = props;
  const formattedStyles = styles.join(',').replace(/,/g, ' | ').split('');
  const dispatch = useDispatch();
  const fetchYoutubeVideos = async (resource_url: RequestInfo, img_url: any) => {
    // TODO: Add isFetching action
    try {
      const response = await fetch(resource_url, {
        method: 'GET',
      });
      const response_json = await response.json();
      dispatch(receiveYoutubeVideos(response_json, img_url));
    } catch (error) {
      dispatch(receiveYoutubeVideosError);
    }
  };

  const handleOnClick = () => {
    fetchYoutubeVideos(resource_url, imgSrc);
  };

  return (
    <li data-index={index} className={`list-view__record-item ${hidden === true ? 'hidden' : null}`}>
      <span>
        <img alt="record-album-cover" className="record-table-item-image" src={imgSrc} />
      </span>
      <span className="record-table-item-info">{artistName}</span>
      <span className="record-table-item-info">{recordTitle}</span>
      <span className="record-table-item-info">{label}</span>
      <span className="record-table-item-info">{year}</span>
      <span className="record-table-item-info">{formattedStyles}</span>
      <span onClick={handleOnClick}>
        <i className="fas fa-headphones" />
      </span>
    </li>
  );
};

export default RecordCollectionItem;
