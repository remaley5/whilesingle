import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import Messages from './components/messengerComponents/Messages'
import FrView from './views/FrView'
import McView from './views/McView'


function App() {

  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><NavLink to="/fr_questions" activeclass="active">FR Questions</NavLink></li>
								<li><NavLink to="/mc_questions" activeclass="active">MC Questions</NavLink></li>
            </ul>
        </nav>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>
            <Route path='/messenger' component={Messages}></Route>
            <Route path='/fr_questions' component={FrView}></Route>
            <Route path='/mc_questions' component={McView}></Route>


            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
