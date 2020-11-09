import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs }) => {
  return (
    <div className="library-container">
      <h2>Library</h2>
      <div className="library-list">
        {songs.map((song) => (
          <LibrarySong key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
