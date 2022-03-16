import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

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
  const appData = useSelector((state: RootState) => state.loadYoutubeVideos);
  const { currentImage } = appData;

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

  const setVolumeLevel = (volume) => {
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

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    setVolumeLevel(event.target.value);
  };

  const toggleVideoPlay = () => {
    if (paused) {
      return (
        <i className="material-icons music-player-button" onClick={playVideo}>
          play_arrow
        </i>
      );
    } else {
      return (
        <i className="material-icons music-player-button" onClick={pauseVideo}>
          pause
        </i>
      );
    }
  };

  return player ? (
    <div className="container h-100">
      <div className="yt-player-video-info row h-100">
        <div className=" col-md-1 my-auto" key={Math.random()}>
          <img alt="music-bar-record-album-cover" className="music-bar-item-image" src={currentImage} />
        </div>
        <div className="col-md-3 my-auto" key={Math.random()}>
          {getArtistAndTrackTitle()}
        </div>
        <div className="offset-md-1 col-md-1 my-auto d-flex align-items-center" key={Math.random()}>
          {toggleVideoPlay()}
        </div>
        <div className="offset-md-2 col-md-3 my-auto d-flex align-items-cente" key={Math.random()}>
          <input type="range" value={volume} onChange={handleVolumeChange} />
        </div>
      </div>

      <div id="yt-player" />
    </div>
  ) : (
    <div className="container h-100">
      <div className="yt-player-video-info row h-100" />
      <div id="yt-player" />
    </div>
  );
};

export default Youtube;
