import React, { useEffect, useState } from 'react';
import Youtube from '../Youtube';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const MusicPlayerBar = () => {
  const [videoId, setVideoId] = useState<null | number>(null);
  const [artistName, setArtistName] = useState<null | string>(null);
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  let currentVideoIndex = useSelector((state: RootState) => state.loadYoutubeVideos.videos.length - 1);
  let currentVideo = useSelector((state: RootState) => state.loadYoutubeVideos.videos[currentVideoIndex].response);

  useEffect(() => {
    getVideoId();
  }, [currentVideo]);

  const getVideoId = () => {
    if (currentVideo) {
      // If no videos have been uploaded to Discogs for this record
      // TODO: update this to better messaging
      if (currentVideo.videos === undefined) {
        console.log('No videos have been uploaded for this record!');
        return;
      }

      const name = currentVideo.artists_sort;
      const title = currentVideo.title;
      setArtistName(name);
      setTrackTitle(title);

      if (currentVideo.videos.length > 1) {
        // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
        const randomVideo = currentVideo.videos[Math.floor(Math.random() * currentVideo.videos.length)].uri;
        const slicedRandomVideo = randomVideo.slice(randomVideo.indexOf('=') + 1, randomVideo.length);
        setVideoId(slicedRandomVideo);
        return slicedRandomVideo;
      } else {
        // If there is only one video uploaded for this record, open it
        const singleVideo = currentVideo.videos[0].uri;
        const slicedSingleVideo = singleVideo.slice(singleVideo.indexOf('=') + 1, singleVideo.length);
        setVideoId(slicedSingleVideo);
        return slicedSingleVideo;
      }
    }
  };

  return (
    <div className="list-view__music-player-bar">
      {videoId ? <Youtube videoId={videoId} artistName={artistName} trackTitle={trackTitle} /> : null}
    </div>
  );
};

export default MusicPlayerBar;
