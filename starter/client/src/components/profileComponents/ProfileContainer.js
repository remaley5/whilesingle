import React from "react";
import {UserProfileContextProvider} from '../../context/user_profile_context';
import Profile from "./Profile";

export default function ProfileContainer() {

	//I don't know WHY this isn't working if we put the context provider component directly in the EditProfile component, but... this works

  return (
    <UserProfileContextProvider>
      <Profile />
		</UserProfileContextProvider>
  );
}
