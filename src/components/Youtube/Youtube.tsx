import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as recordActions from '../../actions/loadRecordsActions';
import { bindActionCreators } from 'redux';

interface YoutubeProps {
  videoId: number;
  onStateChange: (event: any) => void;
  window: any;
}

const Youtube = (props: YoutubeProps) => {
  const { videoId, onStateChange, window } = props;
  const [player, setPlayer] = useState<null | any>(null);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [currentTimeRounded, setCurrentTimeRounded] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!player) {
      const newPlayer = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });

      setPlayer(newPlayer);
    }
    player.then((YT) => {
      const initiatePlayer = new YT.Player('yt-player', {
        height: 0.01,
        width: 0.01,
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onReady,
        },
        playerVars: {
          autoplay: 1,
          controls: 1,
          showinfo: 1,
        },
      });
      setPlayer(initiatePlayer);
    });
  });

  const onReady = (e) => {
    setPlayer(e.target);
  };

  const onPlayerStateChange = (e: any) => {
    onStateChange(e);
  };

  const playVideo = () => {
    player.playVideo();
    setPaused(false);
  };

  const pauseVideo = () => {
    player.pauseVideo();
    setPaused(true);
  };

  const changeVolume = (volume) => {
    player.setVolume(volume);
  };

  const getCurrentTime = () => {
    setCurrentTime(player.getCurrentTime());
  };

  const getDuration = () => {
    setDuration(player.getDuration());
  };

  const formatTime = (time) => {
    if (time / 60 >= 1) {
      return (time = time / 60 + ':' + time);
    }
  };

  const getCurrentTimeRounded = () => {
    let time = Math.floor(player.getCurrentTime());
    setCurrentTimeRounded(time);
  };

  const getArtistAndTrackTitle = () => {
    const videoData = player.getVideoData();
    const { title } = videoData;
    return title;
  };
};

const mapStateToProps = (state) => {
  return {
    app: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      recordActions: bindActionCreators(recordActions, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Youtube);
