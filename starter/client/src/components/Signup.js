import React, { useState, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import AuthContext from '../auth';
import {useHistory} from 'react-router-dom';
import {
  signupFormStyle,
  textFieldStyle,
  h1Style,
  labelStyle,
  buttonHolderStyle,
  buttonStyle,
} from '../styles/signupStyles';



function Signup(props) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [errors, setErrors] = useState([]);
  const {fetchWithCSRF, setCurrentUserId} = useContext(AuthContext);
  let history = useHistory();

  const handleChange = (e) => {
    const {id, value} = e.target;
    switch(id){
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      case "firstName":
        setFirstName(value);
        return;
      case "lastName":
        setLastName(value);
        return;
      default:
        return;
    }
  }

  async function signupUser() {
    const response = await fetchWithCSRF('/api/users/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      })
    });

    const responseData = await response.json();
    if(!response.ok) {
      setErrors(responseData.errors);
    } else {
      setCurrentUserId(responseData.current_user_id)
      history.push('/set_preferences')
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    signupUser();
  }

  return (
    <>
      <CssBaseline />
      <Container style = {{backgroundColor: '#f0f2f6', height: "100vh"}} maxWidth="large">
        <h1 style={h1Style}>Welcome! Who are you?</h1>
        <form style={signupFormStyle}>
          <label style={labelStyle} htmlFor="email">Email</label>
          <TextField
            id='email'
            type='email'
            variant="outlined"
            style={textFieldStyle}
            onChange={handleChange}
           />
          <label style={labelStyle} htmlFor="password">Password</label>
          <TextField
            id='password'
            type='password'
            variant="outlined"
            style={textFieldStyle}
            onChange={handleChange}
           />
          <label style={labelStyle} htmlFor="firstName">First Name</label>
          <TextField
            id='firstName'
            type='text'
            variant="outlined"
            style={textFieldStyle}
            onChange={handleChange}
           />
          <label style={labelStyle} htmlFor="lastName">Last Name</label>
          <TextField
            id='lastName'
            type='text'
            variant="outlined"
            style={textFieldStyle}
            onChange={handleChange}
           />
           <div style={buttonHolderStyle}>
            <Button onClick={handleSignUp} variant="contained" style={buttonStyle}>Sign Up</Button>
            <Button variant="contained" style={buttonStyle} href="/login">Login Instead</Button>
           </div>
        </form>
      </Container>
    </>
  );
}
export default Signup;
