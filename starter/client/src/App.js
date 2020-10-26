import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, useLocation } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginSignup from './components/LoginSignup';
import Signup from './components/Signup'

function App() {
  let location = useLocation();

  return (
    <>
        {location.pathname !== '/login-signup' && location.pathname !== '/signup' ?
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><NavLink to="/login-signup" activeclass="active">Login/Signup</NavLink></li>
            </ul>
        </nav> : null}
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/login-signup">
                <LoginSignup />
            </Route>

            <Route path="/signup">
                <Signup />
            </Route>

            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </>
  );
}

export default App;
