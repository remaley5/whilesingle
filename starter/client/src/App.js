import React, { useState, useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";

import ProfileContainer from "./components/profileComponents/ProfileContainer";

import UserList from './components/UsersList';
import Messages from './components/messengerComponents/Messages'
import Mc from './views/Mc'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Upload from './components/profileComponents/Upload'
import AuthContext from './auth';
import NavBar from './components/NavBar'
import SetPreferences from './components/profileComponents/loginComponents/SetPreferences'
import { ProtectedRoute, AuthRoute } from './Routes';

function App() {
  let location = useLocation();
  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [otherUserId, setOtherUserId] = useState(null)

  const authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId,
    otherUserId,
    setOtherUserId
  };

  useEffect(() => {
    async function restoreCSRF() {
      const response = await fetch("/api/csrf/restore", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const authData = await response.json();
        setFetchWithCSRF(() => {
          return (resource, init) => {
            if (init.headers) {
              init.headers["X-CSRFToken"] = authData.csrf_token;
            } else {
              init.headers = {
                "X-CSRFToken": authData.csrf_token,
              };
            }
            return fetch(resource, init);
          };
        });
        if (authData.current_user_id) {
          setCurrentUserId(authData.current_user_id);
        }
      }
      setLoading(false);
    }
    restoreCSRF();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {location.pathname !== "/login" && location.pathname !== "/signup" ? (
        <nav className='navbar-cont'>
            <NavBar currentUserId={currentUserId} />
        </nav>) : null}
      <Switch>
        <ProtectedRoute
          path="/messenger"
          exact
          component={Messages}
          currentUserId={currentUserId}
        />
        <ProtectedRoute
          path="/profile/:id"
          exact
          component={ProfileContainer}
          currentUserId={currentUserId}
        />
        <ProtectedRoute path="/settings" exact currentUserId={currentUserId} />
        <ProtectedRoute
          path="/quiz"
          exact
          currentUserId={currentUserId}
					component={Mc}
        />
        <ProtectedRoute
          path="/users"
          exact
          component={UserList}
          currentUserId={currentUserId}
        />
        <AuthRoute
          path="/login"
          component={Login}
          currentUserId={currentUserId}
        />
        <AuthRoute
          path="/signup"
          component={Signup}
          currentUserId={currentUserId}
        />
        {/* <ProtectedRoute
          path="/fr_questions"
          exact
          component={FrContainer}
          currentUserId={currentUserId}
        /> */}
        <ProtectedRoute
          path="/mc_questions"
          exact
          component={Mc}
          currentUserId={currentUserId}
        />
        <ProtectedRoute
          path="/upload_images"
          exact
          component={Upload}
          currentUserId={currentUserId}
        />
        {/* <ProtectedRoute
          path="/profile"
          exact
          component={ProfileContainer}
          currentUserId={currentUserId}
        /> */}
         <ProtectedRoute
          path="/set_preferences"
          exact
          component={SetPreferences}
          currentUserId={currentUserId}
        />
        {/* <AuthRoute path="/login" component={Login} />
            <AuthRoute path="/signup" component={Signup} /> */}
        <ProtectedRoute
          path="/"
          component={Home}
          currentUserId={currentUserId}
        />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
