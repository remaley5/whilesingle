import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import TextField from "@material-ui/core/TextField";
import { Button } from '@material-ui/core';
import {
  signupFormStyle,
  textFieldStyle,
  h1Style,
  labelStyle,
  buttonHolderStyle,
  buttonStyle,
} from '../styles/signupStyles';



function Signup(props) {
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
           />
          <label style={labelStyle} htmlFor="password">Password</label>
          <TextField
            id='password'
            type='password'
            variant="outlined"
            style={textFieldStyle}
           />
          <label style={labelStyle} htmlFor="firstName">First Name</label>
          <TextField
            id='firstName'
            type='text'
            variant="outlined"
            style={textFieldStyle}
           />
          <label style={labelStyle} htmlFor="lastName">Last Name</label>
          <TextField
            id='lastName'
            type='text'
            variant="outlined"
            style={textFieldStyle}
           />
           <div style={buttonHolderStyle}>
            <Button variant="contained" style={buttonStyle}>Sign Up</Button>
            <Button variant="contained" style={buttonStyle} href="/login">Login Instead</Button>
           </div>
        </form>
      </Container>
    </>
  );
}
export default Signup;
