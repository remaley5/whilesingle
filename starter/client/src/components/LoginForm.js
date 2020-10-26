import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const LoginFormWrapper = styled.div`
  position: absolute;
  z-index: 99;
  background-color: white;
`;

function LoginForm(props) {

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("CLICKED ON LOGIN");
    return Redirect('/');
  }

  if(props.show === false){
    return null;
  }

  return (
    <LoginFormWrapper>
      <button onClick={props.onClose}>X</button>
      <form onSubmit={handleLogin}>
        <h2>Enter email and password</h2>
        <label htmlFor="email">Email</label>
        <input
          id='email'
          placeholder="Email"
          type="email" />
        <label htmlFor="password">Password</label>
        <input
          id='password'
          placeholder="Password"
          type="password" />
        <button type="submit">NEXT</button>
      </form>
    </LoginFormWrapper>
  );
}
export default LoginForm;
