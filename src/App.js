import React, { useState } from "react";

const Playlist = ({ title, playlist, onDrop }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const song = e.dataTransfer.getData("text");
    onDrop(song);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, song) => {
    e.dataTransfer.setData("text", song);
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ textAlign: "center" }}>{title}</h2>
      <ul
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          textAlign: "center",
          overflowY: "scroll",
          height: "500px",
          backgroundColor: "#e0e0e0",
          boxShadow: "2px 2px 5px #888888",
          borderRadius: "5px",
        }}
      >
        {playlist.map((song, index) => (
          <li
            key={index}
            style={{ padding: "10px 0" }}
            draggable
            onDragStart={(e) => handleDragStart(e, song)}
          >
            {song}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ScrollingPlaylists = () => {
  const [playlist1, setPlaylist1] = useState([
    "song1",
    "song2",
    "song3",
    "song4",
    "song5",
    "song6",
  ]);
  const [playlist2, setPlaylist2] = useState([
    "song7",
    "song8",
    "song9",
    "song10",
    "song11",
    "song12",
    "song13",
    "song14",
    "song15",
    "song16",
    "song17",
  ]);

  const handleDrop1 = (song) => {
    setPlaylist1([...playlist1, song]);
    setPlaylist2(playlist2.filter((s) => s !== song));
  };

  const handleDrop2 = (song) => {
    setPlaylist2([...playlist2, song]);
    setPlaylist1(playlist1.filter((s) => s !== song));
  };

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#333",
          color: "#fff",
          height: "50px",
        }}
      >
        Playlist Manager
      </header>
      <div style={{ flex: 1, display: "flex" }}>
        <Playlist title="Playlist 1" playlist={playlist1} onDrop={handleDrop1} />
        <Playlist title="Playlist 2" playlist={playlist2} onDrop={handleDrop2} />
      </div>
    </div>
  );
};

export default ScrollingPlaylists;
