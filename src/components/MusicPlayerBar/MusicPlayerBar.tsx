import { useEffect, useState } from 'react';
import Youtube from '../Youtube';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const MusicPlayerBar = () => {
  const [videoId, setVideoId] = useState<null | string>(null);
  const [artistName, setArtistName] = useState<null | string>(null);
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  const videoListState = useSelector((state: RootState) => state.youtubeVideosReducer.videosList);
  const appData = useSelector((state: RootState) => state.youtubeVideosReducer);
  const { currentImage } = appData;
  const currentVideoIndex = videoListState.length - 1;
  const chosenVideo = videoListState[currentVideoIndex];

  useEffect(() => {
    getVideoId();
  }, [chosenVideo]);

  const getVideoId = () => {
    if (chosenVideo) {
      // TODO: update this to better messaging
      if (chosenVideo === undefined) {
        console.log('No videos have been uploaded for this record!');
        return;
      }

      const name = chosenVideo.response_json.artists_sort;
      const title = chosenVideo.response_json.title;
      const randomVideo =
        chosenVideo.response_json.videos[Math.floor(Math.random() * chosenVideo.response_json.videos.length)].uri;
      const slicedRandomVideo = randomVideo.slice(randomVideo.indexOf('=') + 1, randomVideo.length);

      setArtistName(name);
      setTrackTitle(title);
      setVideoId(slicedRandomVideo);
    }
  };

  return (
    <div className="list-view__music-player-bar">
      {videoId ? (
        <Youtube videoId={videoId} artistName={artistName} trackTitle={trackTitle} currentImage={currentImage} />
      ) : (
        <Youtube videoId="" artistName="" trackTitle="" currentImage="" />
      )}
    </div>
  );
};

export default MusicPlayerBar;
