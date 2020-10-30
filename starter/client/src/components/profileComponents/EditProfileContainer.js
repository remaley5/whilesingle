import React, { useContext } from "react";
import {UserProfileContextProvider} from '../../context/user_profile_context';

import EditProfile from "./EditProfile";

export default function EditProfileContainer() {

	//I don't know WHY this isn't working if we put the context provider component directly in the EditProfile component, but... this works

  return (
    <UserProfileContextProvider>
      <EditProfile/>
		</UserProfileContextProvider>
  );
}
