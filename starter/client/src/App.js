import React, {useState, useEffect} from 'react';
import { Switch, Route, NavLink, useLocation } from 'react-router-dom';

import UserList from './components/UsersList';
import Messages from './components/messengerComponents/Messages'
import FrView from './views/FrView'
import McView from './views/McView'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AuthContext from './auth';
import NavBar from './components/NavBar'
import { ProtectedRoute, AuthRoute } from './Routes';


function App() {
  let location = useLocation();
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const authContextValue = {
      fetchWithCSRF,
      currentUserId,
      setCurrentUserId,
  };
  const logoutUser = async ()=> {
    const response = await fetchWithCSRF('/logout', {
        method: 'POST',
        credentials: 'include'
    });
    if(response.ok){
        setCurrentUserId(null)
    }
  }
  useEffect(() => {
      async function restoreCSRF() {
          const response = await fetch('/api/csrf/restore', {
              method: "GET",
              credentials: 'include'
          });
          if (response.ok){
              const authData = await response.json();
              setFetchWithCSRF(() => {
                  return (resource, init) => {
                      if(init.headers) {
                          init.headers['X-CSRFToken'] = authData.csrf_token;
                      } else {
                          init.headers = {
                              'X-CSRFToken': authData.csrf_token
                          }
                      }
                      return fetch(resource, init)
                  }
              });
              if(authData.current_user_id){
                  setCurrentUserId(authData.current_user_id)
              }
          }
          setLoading(false);
      }
      restoreCSRF();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
        {loading && <div>Loading...</div>}
        {!loading &&
        location.pathname !== '/login' && location.pathname !== '/signup' ?
        <nav>
            <NavBar setCurrentUserId={setCurrentUserId} />
        </nav> : null}
        <Switch>
            <ProtectedRoute path="/messenger" exact component={Messages} currentUserId={currentUserId} />
            <ProtectedRoute path="/profile/:id" exact currentUserId={currentUserId}/>
            <ProtectedRoute path="/settings" exact currentUserId={currentUserId}/>
            <ProtectedRoute path="/users" exact component={UserList} currentUserId={currentUserId} />
            <ProtectedRoute path='/fr_questions' exact component={FrView} currentUserId={currentUserId}/>
            <ProtectedRoute path='/mc_questions' exact component={McView} currentUserId={currentUserId}/>
            <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={Signup} />
            <ProtectedRoute path="/" component={Home} currentUserId={currentUserId} />
        </Switch>
    </AuthContext.Provider>
  );
}

export default App;
