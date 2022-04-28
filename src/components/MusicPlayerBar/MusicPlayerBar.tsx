import { useEffect, useState } from 'react';
import Youtube from '../Youtube';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const MusicPlayerBar = () => {
  const [videoId, setVideoId] = useState<null | string>(null);
  const [artistName, setArtistName] = useState<null | string>(null);
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  const currentVideoIndex = useSelector((state: RootState) => state.youtubeVideosReducer.videos.length - 1);
  const currentVideo = useSelector(
    (state: RootState) => state.youtubeVideosReducer.videos[currentVideoIndex].response_json
  );

  useEffect(() => {
    getVideoId();
  }, [currentVideo]);

  const getVideoId = () => {
    if (currentVideo) {
      // TODO: update this to better messaging
      if (currentVideo === undefined) {
        console.log('No videos have been uploaded for this record!');
        return;
      }

      const name = currentVideo !== undefined ? currentVideo.artists_sort : '';
      const title = currentVideo !== undefined ? currentVideo.title : '';
      const randomVideo =
        currentVideo !== undefined
          ? currentVideo.videos[Math.floor(Math.random() * currentVideo.videos.length)].uri
          : '';
      const slicedRandomVideo =
        currentVideo !== undefined ? randomVideo.slice(randomVideo.indexOf('=') + 1, randomVideo.length) : '';
      setArtistName(artistName !== name ? name : artistName);
      setTrackTitle(trackTitle !== title ? title : trackTitle);
      setVideoId(videoId !== slicedRandomVideo ? slicedRandomVideo : videoId);
    }
  };

  return (
    <div className="list-view__music-player-bar">
      {videoId ? <Youtube videoId={videoId} artistName={artistName} trackTitle={trackTitle} /> : null}
    </div>
  );
};

export default MusicPlayerBar;
