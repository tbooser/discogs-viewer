import React, { useEffect, useState } from 'react';
import Youtube from '../Youtube';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as recordActions from '../../actions/loadRecordsActions';

interface MusicPlayerBarProps {
  app: object;
}

const MusicPlayerBar = (props: MusicPlayerBarProps) => {
  const { app } = props;
  const [videoId, setVideoId] = useState<null | number>(null);

  useEffect(() => {
    getVideoId();
  });

  const getVideoId = () => {
    let currentVideoIndex = app.loadYoutubeVideos.videos.length - 1;
    let currentVideo = app.loadYoutubeVideos.videos[currentVideoIndex].response;
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch),
    },
  };
};

const mapStateToProps = (state) => {
  return {
    app: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayerBar);
