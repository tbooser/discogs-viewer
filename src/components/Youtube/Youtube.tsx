import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface YoutubeProps {
  videoId: number;
  artistName: string;
  trackTitle: string;
}

const Youtube = (props: YoutubeProps) => {
  const { videoId, artistName, trackTitle } = props;
  const [playerState, setPlayerState] = useState(null);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [currentTimeRounded, setCurrentTimeRounded] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const appData = useSelector((state: RootState) => state.loadYoutubeVideos);
  const { currentImage } = appData;

  useEffect(() => {
    let player;
    const ytPlayer = new Promise((resolve, reject) => {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      (window as any).onYouTubeIframeAPIReady = () => resolve((window as any).YT);
    });

    ytPlayer.then((YT) => {
      player = new (window as any).YT.Player('yt-player', {
        videoId: videoId,
        events: {
          onStateChange: onPlayerStateChange,
          onReady: onPlayerReady,
        },
        playerVars: {
          autoplay: 1,
          controls: 1,
          showinfo: 1,
        },
      });
    });
  });

  useEffect(() => {
    if (playerState) {
      playerState.loadVideoById(videoId);
    }
  }, [videoId]);

  const onPlayerReady = (e) => {
    setPlayerState(e.target);
  };

  const onPlayerStateChange = (e: any) => {};

  const playVideo = () => {
    playerState.playVideo();
    setPaused(false);
  };

  const pauseVideo = () => {
    playerState.pauseVideo();
    setPaused(true);
  };

  const setVolumeLevel = (volume) => {
    playerState.setVolume(volume);
  };

  const getCurrentTime = () => {
    setCurrentTime(playerState.getCurrentTime());
  };

  const getDuration = () => {
    setDuration(playerState.getDuration());
  };

  const formatTime = (time) => {
    if (time / 60 >= 1) {
      return (time = time / 60 + ':' + time);
    }
  };

  const getCurrentTimeRounded = () => {
    let time = Math.floor(playerState.getCurrentTime());
    setCurrentTimeRounded(time);
  };

  const getArtistAndTrackTitle = () => {
    const videoData = playerState.getVideoData();
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

  return (
    <>
      <div className="music-player-bar__info">
        <span className="music-player-bar__album-cover" key={Math.random()}>
          <img alt="music-bar-record-album-cover" className="music-bar-item-image" src={currentImage} />
        </span>
        <span className="music-player-bar__artist-name">{artistName}</span>
        <span className="music-player-bar__track-title">{trackTitle}</span>
        <span className="music-player-bar__toggle-play" key={Math.random()}>
          {toggleVideoPlay()}
        </span>
        <span className="music-player-bar__volume-control" key={Math.random()}>
          <input type="range" value={volume} onChange={handleVolumeChange} />
        </span>
      </div>
      <div id="yt-player" />
    </>
  );
};

export default Youtube;
