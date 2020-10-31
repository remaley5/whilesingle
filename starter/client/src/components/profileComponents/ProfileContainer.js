import React from "react";
import { UserProfileContextProvider } from "../../context/user_profile_context";
import Profile from "./Profile";
import { UserProfileInfoContextProvider } from "../../context/user_profile_info_context";
import { FrContextProvider } from "../../context/fr_context";


export default function ProfileContainer(props) {
  //I don't know WHY this isn't working if we put the context provider component directly in the EditProfile component, but... this works
  console.log('props:', props)
  console.log('props.history:', props.history)
  console.log('props.match.path:', props.match.path)
  console.log('props.match.params:', props.match.params.id)

  const viewId = parseInt(props.match.params.id,10)
  return (
    <UserProfileInfoContextProvider>
      <FrContextProvider>
        <UserProfileContextProvider>
          <Profile viewId={viewId} />
        </UserProfileContextProvider>
      </FrContextProvider>
    </UserProfileInfoContextProvider>
  );
}
