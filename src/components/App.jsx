import React, { useState } from 'react';
import LoginSignup from './login-signup/LoginSignup';
import Chat from './Chat/Chat';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const populate = () => {
    if (!isLoggedIn) {
      return (
        <div>
          <h1>Hello, Learners!</h1>
          <LoginSignup
            setUsername={setUsername}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        </div>
      );
    }
    return (
      <div>
        <Chat username={username} />
      </div>
    );
  };

  return <div className="App">{populate()}</div>;
};

export default App;
