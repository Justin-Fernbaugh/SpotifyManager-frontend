import React, { useState, useEffect } from "react";
import axios from "axios";

//Globals for query parameters in the URL
const queryParams = new URLSearchParams(window.location.search)
const accessToken = queryParams.get("accessToken")
const refreshToken = queryParams.get("refreshToken")
const params = `?accessToken=${accessToken}&refreshToken=${refreshToken}`

const Playlist = ({playlist, onDrop }) => {
  // temp title -- pull from the playlist
  let title = 'Playlist Name'
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
  const [playlist1, setPlaylist1] = useState([]);
  const [playlist2, setPlaylist2] = useState([]);

  const handleDrop1 = (song) => {
    setPlaylist1([...playlist1, song]);
    setPlaylist2(playlist2.filter((s) => s !== song));
  };

  const handleDrop2 = (song) => {
    setPlaylist2([...playlist2, song]);
    setPlaylist1(playlist1.filter((s) => s !== song));
  };

  //useEffect() for Playlist1
  useEffect(() => {
    axios.get(`http://localhost:4000/api/playlist/all${params}`)
      .then(response => {
        // assuming the API returns an array of song objects
        const songs = response.data;
        for(let i=0; i < songs.length; i++)
          setPlaylist1( arr => [...arr, songs[i].name] );
      })
      .catch(error => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  //useEffect for Playlist2
  useEffect(() => {
    axios.get(`http://localhost:4000/api/playlist/all${params}`)
      .then(response => {
        // assuming the API returns an array of song objects
        const songs = response.data;
        for(let i=0; i < songs.length; i++)
          setPlaylist2( arr => [...arr, songs[i].name] );
      })
      .catch(error => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100% - 50px)",
        }}
      >
        <div style={{ width: "50%" }}>
          {/* <h2 style={{ textAlign: "center" }}>Playlist 1</h2> */}
          <Playlist playlist={playlist1} onDrop={handleDrop1} />
        </div>
        <div style={{ width: "50%" }}>
          {/* <h2 style={{ textAlign: "center" }}>Playlist 2</h2> */}
          <Playlist playlist={playlist2} onDrop={handleDrop2} />
        </div>
      </div>
    </div>
  );
};

export default ScrollingPlaylists;
