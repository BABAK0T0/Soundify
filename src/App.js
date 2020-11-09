import React from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./style/app.scss";

function App() {
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
