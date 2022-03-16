import React, { useEffect, useState } from 'react';
import Youtube from '../Youtube';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const MusicPlayerBar = () => {
  const [videoId, setVideoId] = useState<null | number>(null);

  useEffect(() => {
    getVideoId();
  });

  const getVideoId = () => {
    let currentVideoIndex = useSelector((state: RootState) => state.loadYoutubeVideos.videos.length - 1);
    let currentVideo = useSelector((state: RootState) => state.loadYoutubeVideos.videos[currentVideoIndex].response);

    if (currentVideo) {
      if (currentVideo.videos === undefined) {
        // If no videos have been uploaded to Discogs for this record
        alert('No videos have been uploaded for this record!');
        return;
      }
      if (currentVideo.videos.length > 1) {
        // If there is more than one video uploaded for this record, i.e. for multiple tracks, select one randomly to open
        var randomVideo = currentVideo.videos[Math.floor(Math.random() * currentVideo.videos.length)].uri;

        var slicedRandomVideo = randomVideo.slice(randomVideo.indexOf('=') + 1, randomVideo.length);
        setVideoId(slicedRandomVideo);
        return slicedRandomVideo;
      } else {
        // If there is only one video uploaded for this record, open it
        var singleVideo = currentVideo.videos[0].uri;
        var slicedSingleVideo = singleVideo.slice(singleVideo.indexOf('=') + 1, singleVideo.length);
        setVideoId(slicedSingleVideo);
        return slicedSingleVideo;
      }
    }
  };

  if (videoId) {
    return (
      <div className="music-player-bar">
        <Youtube videoId={videoId} />
      </div>
    );
  } else {
    return <div />;
  }
};

export default MusicPlayerBar;
