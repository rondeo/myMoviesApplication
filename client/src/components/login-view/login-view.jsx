//login-view.jsx

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Prop-Types from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ registered, setRegistered ] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault(); /* to prevent default refresh of page from this method*/
    console.log(username, password);
    /* send request to server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegistry =(e) => {
    e.preventDefault();
    props.onRegistrationClicked();
  };


  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="Username"
          onChange = {e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        value={password}
        placeholder="Password"
        onChange = {e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick = {handleSubmit}>
        Login
      </Button>

      <Button
        variant="secondary"
        type="submit"
        onClick = {handleRegistry}>
        Not registered yet? Sign up here
      </Button>

    </Form>
    );
  }

  LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onRegistrationClicked: PropTypes.func.isRequired
  };