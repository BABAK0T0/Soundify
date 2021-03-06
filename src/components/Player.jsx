import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}) => {
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0,
  });

  useEffect(() => {
    setSongs((prevSongs) => {
      return prevSongs.map((s) => ({
        ...s,
        active: s.id === currentSong.id,
      }));
    });
  }, [currentSong, setSongs]);

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value; // Link input value to song value
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-back") {
      await setCurrentSong(
        songs[(songs.length - 1 + currentIndex) % songs.length]
      );
    }
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercent = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    // Fix: If user changes song and prev song was playing, keep this state, to play the next one automatically.
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercent,
    });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef && audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef && audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const endSongHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(
      songs[(songs.length - 1 + currentIndex) % songs.length]
    );
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercent}%)`,
  };

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}
            )`,
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : getTime(0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        onEnded={endSongHandler}
      ></audio>
    </div>
  );
};

export default Player;
