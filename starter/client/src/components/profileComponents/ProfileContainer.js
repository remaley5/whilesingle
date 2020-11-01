import React, {useContext} from "react";
import Profile from "./Profile";
import ProfileMatch from "./ProfileMatch";
import { UserProfileInfoContextProvider } from "../../context/user_profile_info_context";
import AuthContext from "../../auth";

export default function ProfileContainer(props) {
  const { currentUserId } = useContext(AuthContext);
  const otherUserId = parseInt(props.match.params.id, 10);
  return (
    <UserProfileInfoContextProvider>
      {(otherUserId === currentUserId) ? <Profile /> :
      <ProfileMatch otherUserId={otherUserId} />}
    </UserProfileInfoContextProvider>
  );
}
