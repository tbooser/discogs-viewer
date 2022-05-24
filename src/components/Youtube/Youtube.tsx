import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

interface YoutubeProps {
  videoId: string | undefined;
  artistName: string | null;
  trackTitle: string | null;
  currentImage: string | undefined;
}

const Youtube = (props: YoutubeProps) => {
  const { videoId, artistName, trackTitle, currentImage } = props;
  const [playerState, setPlayerState] = useState(null);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [currentTimeRounded, setCurrentTimeRounded] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    let player;
    const ytPlayer = new Promise((resolve, reject) => {
      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      let firstScriptTag = document.getElementsByTagName('script')[0];
      // Short circuit if object === null {?}
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
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
      (playerState as any).loadVideoById(videoId);
    }
  }, [videoId]);

  const onPlayerReady = (e: { target: React.SetStateAction<null> }) => {
    setPlayerState(e.target);
  };

  const onPlayerStateChange = (e: any) => {};

  const playVideo = () => {
    (playerState as any).playVideo();
    setPaused(false);
  };

  const pauseVideo = () => {
    (playerState as any).pauseVideo();
    setPaused(true);
  };

  const setVolumeLevel = (volume: any) => {
    (playerState as any).setVolume(volume);
  };

  const getCurrentTime = () => {
    setCurrentTime((playerState as any).getCurrentTime());
  };

  const getDuration = () => {
    setDuration((playerState as any).getDuration());
  };

  const formatTime = (time: string | number) => {
    if ((time as number) / 60 >= 1) {
      return (time = (time as number) / 60 + ':' + time);
    }
  };

  const getCurrentTimeRounded = () => {
    let time = Math.floor((playerState as any).getCurrentTime());
    setCurrentTimeRounded(time);
  };

  const getArtistAndTrackTitle = () => {
    const videoData = (playerState as any).getVideoData();
    const { title } = videoData;
    return title;
  };

  const handleVolumeChange = (event: { target: { value: React.SetStateAction<number> } }) => {
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
      {' '}
      <div className="music-player-bar__info">
        <span className="music-player-bar__album-cover" key={Math.random()}>
          <img className="music-bar-item-image" src={currentImage} />
        </span>
        <span className="music-player-bar__artist-name">{artistName}</span>
        <span className="music-player-bar__track-title">{trackTitle}</span>
        <span className="music-player-bar__toggle-play" key={Math.random()}>
          {toggleVideoPlay()}
        </span>
        <span className="music-player-bar__volume-control" key={Math.random()}>
          <input type="range" value={volume} onChange={() => handleVolumeChange} />
        </span>
      </div>
      <div id="yt-player" />
    </>
  );
};

export default Youtube;
