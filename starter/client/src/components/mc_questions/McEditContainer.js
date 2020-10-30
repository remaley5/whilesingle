import React, { useContext } from "react";

import { McContext } from "../../context/mc_context";
import McEdit from "./McEdit";

export default function McEditContainer() {
  const mcContext = useContext(McContext);

  const { userAnsweredMc, userUnansweredMc } = mcContext;

  const mcArr = [...userAnsweredMc, ...userUnansweredMc];
  return (
    <div className="mc-con">
      <div className="mc-side-bar">
        <h4 className="side-bar-head">Your questions</h4>
        <p className="side-bar-info">
          answer more questions and get a good match
        </p>
        <button className="side-bar-btn answered">answered</button>
        <button className="side-bar-btn new">new</button>
      </div>
      <div className="mc-ques-con">
        {mcArr.map((mcObj, idx) => (
          <McEdit key={idx} mcObj={mcObj} />
        ))}
      </div>
    </div>
  );
}
