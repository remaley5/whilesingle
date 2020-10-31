import React, { useState, createContext, useEffect } from "react";

export const UserProfileInfoContext = createContext();

export const UserProfileInfoContextProvider = (props) => {
	const [prefOptions, setPrefOptions] = useState(null);
  const [genderOptions, setGenderOptions] = useState(null);
  const [pronounOptions, setPronounOptions] = useState(null);

	useEffect(() => {
    async function getInfoOptions() {
      const res = await fetch("/api/users/info_options");
      const data = await res.json();
      setPrefOptions(data.preferences);
      setGenderOptions(data.genders);
      setPronounOptions(data.pronouns);
    }
    getInfoOptions();
  }, []);

	const userProfileInfo = {prefOptions, genderOptions, pronounOptions}

	return (
    <UserProfileInfoContext.Provider value={userProfileInfo}>
      {props.children}
    </UserProfileInfoContext.Provider>
  );
};
