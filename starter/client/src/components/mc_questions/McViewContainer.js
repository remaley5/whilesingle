import React, { useContext } from "react";

import { McContext } from "../../context/mc_context";
import McView from "./McView";

export default function McViewContainer() {
  const mcContext = useContext(McContext);

  // if profile you're viewing is yourself, load userAnsweredMc
  // if viewing a match, load matchAnsweredMc
  //	for now we hardcode userAnswered
  const { userAnsweredMc, matchAnsweredMc } = mcContext;

	const mcArr = [...userAnsweredMc];
	console.log(mcArr)
  return (
    <>
      {mcArr.map((mcObj, idx) => (
        <McView key={idx} mcObj={mcObj} />
      ))}
    </>
  );
}
