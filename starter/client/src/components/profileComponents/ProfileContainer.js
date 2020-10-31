import React from "react";
import { UserProfileContextProvider } from "../../context/user_profile_context";
import Profile from "./Profile";
import { UserProfileInfoContextProvider } from "../../context/user_profile_info_context";
import { FrContextProvider } from "../../context/fr_context";


export default function ProfileContainer() {
  //I don't know WHY this isn't working if we put the context provider component directly in the EditProfile component, but... this works

  return (
    <UserProfileInfoContextProvider>
      <FrContextProvider>
        <UserProfileContextProvider>
          <Profile />
        </UserProfileContextProvider>
      </FrContextProvider>
    </UserProfileInfoContextProvider>
  );
}
