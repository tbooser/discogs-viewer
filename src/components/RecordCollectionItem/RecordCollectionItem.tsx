import { useEffect, useRef } from 'react';
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
  collectionCurrentlyRendered: number;
  wantlistCurrentlyRendered: number;
  infiniteScrollHandler: () => void;
  listType: string;
}

const RecordCollectionItem = (props: RecordCollectionItemProps) => {
  const {
    resource_url,
    imgSrc,
    artistName,
    recordTitle,
    label,
    year,
    styles,
    index,
    collectionCurrentlyRendered,
    wantlistCurrentlyRendered,
    infiniteScrollHandler,
    listType,
  } = props;
  const formattedStyles = styles.join(',').replace(/,/g, ' | ').split('');
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  let ioOptions = {
    rootMargin: '0px',
    threshold: 1.0,
  };

  const ioCallback = (entries: any) => {
    const triggerIndex = listType === 'collection' ? collectionCurrentlyRendered - 15 : wantlistCurrentlyRendered - 15;
    entries.forEach(
      (entry: {
        intersectionRatio: number;
        target: { classList: { add: (arg0: string) => void; remove: (arg0: string) => void }; dataset: { index: any } };
      }) => {
        if (entry.intersectionRatio > 0) {
          if (parseInt(entry.target.dataset.index) === triggerIndex) {
            infiniteScrollHandler();
          }
        }
      }
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(ioCallback, ioOptions);
    if (scrollRef.current) {
      const curr: any = scrollRef.current;
      observer.observe(curr);
    }
  }, [collectionCurrentlyRendered, wantlistCurrentlyRendered]);

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

  const handleHiddenClass = () => {
    return listType === 'collection'
      ? index > collectionCurrentlyRendered
        ? 'hidden'
        : ''
      : index > wantlistCurrentlyRendered
      ? 'hidden'
      : '';
  };

  return (
    <li data-index={index} ref={scrollRef} className={`list-view__record-item ${handleHiddenClass()}`}>
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
