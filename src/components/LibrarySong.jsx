import React from "react";

const LibrarySong = ({ song, setSongs, setCurrentSong }) => {
  const { cover, name, artist } = song;

  const songSelectHandler = () => {
    setCurrentSong(song);
    setSongs((prevSongs) => {
      return prevSongs.map((s) => ({
        ...s,
        active: s.id === song.id,
      }));
    });
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song-container ${song.active ? "selected" : ""}`}
    >
      <img src={cover} alt={`cover-${name}`} />
      <div className="song-description">
        <h3>{name}</h3>
        <h4>{artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
