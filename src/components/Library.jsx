import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ libraryStatus, songs, setSongs, setCurrentSong }) => {
  return (
    <div
      className={`library-container ${libraryStatus ? "active-library" : ""}`}
    >
      <h2>Library</h2>
      <div className="library-list">
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
