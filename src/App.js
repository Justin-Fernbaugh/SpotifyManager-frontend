import React, { useState, Link  } from 'react';

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

const AuthRedirect = ({ children }) => {
  const [show, toggleShow] = useState(false);

  return (
    <>
      {!show && <Button onClick={() => {
        toggleShow(true)
        window.location = "https://example.com/"
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
      <div class="login h-100 d-flex align-items-center justify-content-center">
        <AuthRedirect>
          We now have Toasts
          <span role="img" aria-label="tada">
            🎉
          </span>
        </AuthRedirect>
      </div>
    </Container>
  </Container>
);

export default App;
