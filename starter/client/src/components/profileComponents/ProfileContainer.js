import React, {useContext} from "react";
import { UserProfileContextProvider } from "../../context/user_profile_context";
import Profile from "./Profile";
import ProfileMatch from "./ProfileMatch";
import { UserProfileInfoContextProvider } from "../../context/user_profile_info_context";
import { FrContextProvider } from "../../context/fr_context";
import AuthContext from "../../auth";

export default function ProfileContainer(props) {
  //I don't know WHY this isn't working if we put the context provider component directly in the EditProfile component, but... this works
  const { currentUserId } = useContext(AuthContext);
  const otherUserId = parseInt(props.match.params.id, 10);
  if (otherUserId === currentUserId) {
    return (
      <UserProfileInfoContextProvider>
        <FrContextProvider>
          <UserProfileContextProvider>
            <Profile />
          </UserProfileContextProvider>
        </FrContextProvider>
      </UserProfileInfoContextProvider>
    );
  } else {
		// change context to that of the match
		return (
			<UserProfileInfoContextProvider>
        <FrContextProvider>
          <UserProfileContextProvider>
            <ProfileMatch otherUserId={otherUserId} />
          </UserProfileContextProvider>
        </FrContextProvider>
      </UserProfileInfoContextProvider>
		)
	}
}
