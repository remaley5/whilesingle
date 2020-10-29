import React, { useContext } from "react";

import { McContext } from "../../context/mc_context";
import McEdit from "./McEdit";

export default function McEditContainer() {
  const mcContext = useContext(McContext);

  const { userAnsweredMc, userUnansweredMc } = mcContext;

    const mcArr = [...userAnsweredMc, ...userUnansweredMc];
    return (
      <>
        {mcArr.map((mcObj, idx) => (
          <McEdit key={idx} mcObj={mcObj} />
        ))}
      </>
    );
}
