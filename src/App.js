import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import Library from "./components/Library";
import data from "./data";
import "./style/app.scss";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library
        libraryStatus={libraryStatus}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
}

export default App;
