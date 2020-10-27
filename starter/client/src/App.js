import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import Messages from './components/messengerComponents/Messages'
import FRView from './views/FRView'

function App() {

  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><NavLink to="/fr_questions" activeclass="active">FR Questions</NavLink></li>

            </ul>
        </nav>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path='/messenger' component={Messages}></Route>
            <Route path='/fr_questions' component={FRView}></Route>

            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
