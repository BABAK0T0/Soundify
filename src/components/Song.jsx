import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  const { cover, name, artist } = currentSong;

  return (
    <div className="song-container">
      <img
        src={cover}
        alt={`cover-${name}`}
        className={isPlaying ? "active-song" : ""}
      />
      <h2>{name}</h2>
      <h3>{artist}</h3>
    </div>
  );
};

export default Song;
