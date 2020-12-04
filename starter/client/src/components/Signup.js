import React, { useState, useContext } from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from '../auth';
import { useHistory, NavLink } from 'react-router-dom';
// import {
//   signupFormStyle,
//   inputStyle,
//   h1Style,
//   labelStyle,
//   NavLinkHolderStyle,
//   NavLinkStyle,
// } from '../styles/signupStyles';



function Signup(props) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
	let errors = useState([]);
	const setErrors = errors[1]
  const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
  let history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
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
    if (!response.ok) {
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
    <div className='sign-up-page'>
      <div className='sign-up'>
        <h1 className='sign-in__title'>Welcome! Who are you?</h1>
        <form className='sign-form'>
          <label className='form-label' htmlFor="email">Email</label>
          <input
            id='email'
            type='email'
            className='sign-in__text'
            onChange={handleChange}
          />
          <label className='form-label' htmlFor="password">Password</label>
          <input
            id='password'
            type='password'
            className='sign-in__text'
            onChange={handleChange}
          />
          <label className='form-label' htmlFor="firstName">First Name</label>
          <input
            id='firstName'
            type='text'
            className='sign-in__text'
            onChange={handleChange}
          />
          <label className='form-label' htmlFor="lastName">Last Name</label>
          <input
            id='lastName'
            type='text'
            className='sign-in__text'
            onChange={handleChange}
          />
          <div className='sign-form-btns'>
            <button onClick={handleSignUp} className='sign-form-btn left'>sign up</button>
            <NavLink className='sign-form-btn right' to="/login">sign in instead</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
