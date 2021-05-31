import React, { useState, useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { auth } from '../../firebase';
import NavTopbar from '../NavTopbar/NavTopbar';
import Chat from './Chat/Chat';
import NavSidebar from './NavSidebar';
import Members from './Members';
import './GroupChat.css';

const GET_USER = gql`
  query getProfile($email: String!) {
    getProfile(email: $email) {
      id
      email
      username
      name
      age
    }
  }
`;
const GroupChat = () => {
  const [isLogged, setIsLogged] = useState([]);
  const [enviroment, setEnviroment] = useState([]);
  const [room, setRoom] = useState('TESTINGLOBBY-123456-lobby');
  let userEmail;
  const [getUser, { data }] = useLazyQuery(GET_USER, {
    variables: {
      email: userEmail,
    },
  });

  useEffect(() => {
    if (!auth.currentUser) {
      setIsLogged(<Redirect to="/signup" />);
    } else {
      userEmail = auth.currentUser.email;
      console.log(userEmail);
      getUser({
        variables: {
          email: userEmail,
        },
      });
    }
  }, [room]);

  return (
    <div>
      {isLogged}
      <CssBaseline />
      <NavTopbar title="Chat" showSearchbar="true" />
      <div id="GroupChat_container">
        <NavSidebar setRoom={setRoom} currentRoom={room} />
        <Chat key={room} room={room} user={data} />
        <Members />
      </div>
    </div>
  );
};

export default GroupChat;
