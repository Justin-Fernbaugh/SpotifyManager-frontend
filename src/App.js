import React, { useState, useEffect } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


import './App.css';

// const ExampleToast = ({ children }) => {
//   const [show, toggleShow] = useState(true);

//   return (
//     <>
//       {!show && <Button onClick={() => toggleShow(true)}>Login</Button>}
//       <Toast show={show} onClose={() => toggleShow(false)}>
//         <Toast.Header>
//           <strong className="mr-auto">React-Bootstrap</strong>
//         </Toast.Header>
//         <Toast.Body>{children}</Toast.Body>
//       </Toast>
//     </>
//   );
// };

// async function GetPlaylists(accessToken, refreshToken) {

//   try {
//     const res = await axios.get('http://localhost:4000/api/playlist/all', {
//     params: {
//       accessToken: accessToken,
//       refreshToken: refreshToken
//     }}).then(data => { console.log(data)} )
//     //   // console.log(response.status);
//     //   // console.log(response.statusText);
//     //   // console.log(response.headers);
//     //   // console.log(response.config);
//     // });
//     // return await res.data;
//     return;
//   } catch (error) {
//     console.log(error);
//   }
// };

const AllPlaylists = async () => {
  const queryParams = new URLSearchParams(window.location.search)
  const accessToken = queryParams.get("accessToken")
  const refreshToken = queryParams.get("refreshToken")
  const params = `?accessToken=${accessToken}&refreshToken=${refreshToken}`

  if(!accessToken) return(null);
  if(!refreshToken) return(null);

  const response = await fetch(`http://localhost:4000/api/playlist/all${params}`);
  const jsonResponse = await response.json();

  let playlistNames = [];
  for(let i=0; i < jsonResponse.length; i++)
    playlistNames.push(jsonResponse[i].name);

  console.log(playlistNames);
  console.log(jsonResponse);
  // return JSON.stringify(playlistNames);
  return playlistNames;
}

function RenderResult() {
  const [apiResponse, setApiResponse] = useState(["Loading"]);
  const queryParams = new URLSearchParams(window.location.search)
  const accessToken = queryParams.get("accessToken")
  const refreshToken = queryParams.get("refreshToken")

  useEffect(() => {
    AllPlaylists().then(
          result => {
            setApiResponse(result)
          });
  },[]);

  if(!accessToken) return(null);
  if(!refreshToken) return(null);

  return(
      <div>
          <h1 className="h-100 d-flex align-items-center justify-content-center">Playlists</h1>
          {
            apiResponse.map((m, i) => {
              // return <a href={`#${m}`}>{(i ? '\n ' : '') + m}</a>;
              return <p>{(i ? ' ' : '') + m}</p>;
            })
          }
      </div>
  );
};

const Auth = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      {!show && <Button onClick={() => {
        toggleShow(true)
        window.location = "http://localhost:4000/login"
        }}>Login</Button>}

      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">Redirect</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Spotify Manager</h1>
      <div className="login h-100 d-flex align-items-center justify-content-center">
        <Auth>
          Sign into Spotify in opened window
        </Auth>
      </div>
      <RenderResult/>
    </Container>
  </Container>
);

export default App;
