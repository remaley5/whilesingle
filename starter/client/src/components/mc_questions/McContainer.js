import React, { useContext } from "react";

import { McContext } from "../../context/mc_context";
import McUserForm from "./McUserForm";
import McMatchView from "./McMatchView";

export default function McContainer({ view }) {
  const mcContext = useContext(McContext);

  const { userAnsweredMc, userUnansweredMc, matchAnsweredMc } = mcContext;

  if (view === "user") {
    const mcArr = [...userAnsweredMc, ...userUnansweredMc];
    return (
      <>
        {mcArr.map((mcObj, idx) => (
          <McUserForm key={idx} mcObj={mcObj} />
        ))}
      </>
    );
  } else {
    const mcArr = [...matchAnsweredMc];
    return (
      <>
        {mcArr.map((mcObj, idx) => (
          <McMatchView key={idx} mcObj={mcObj} />
        ))}
      </>
    );
  }
}
