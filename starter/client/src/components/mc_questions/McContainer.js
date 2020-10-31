import React, { useContext, useState } from "react";

import { McContext } from "../../context/mc_context";
import McEdit from "./McEdit";
import McView from "./McView";

export default function McContainer({edit}) {
  const mcContext = useContext(McContext);
  const { userAnsweredMc, userUnansweredMc, setUpdated } = mcContext;
  const [view, setView] = useState("all");


  if (!edit) {
    let mcArr = [...userAnsweredMc]
    return (
      <>
      {mcArr.map((mcObj, idx) => (
        <McView key={idx} mcObj={mcObj} />
      ))}
    </>
    )
  } else {
    let mcArr = [...userAnsweredMc, ...userUnansweredMc];

    const handleClick = (e) => {
      const newView = e.target.id.slice(3);
      setView(newView);
      setUpdated(false)
    };



    if (view === "unanswered") {
      mcArr = [...userUnansweredMc];
    } else if (view === "answered") {
      mcArr = [...userAnsweredMc];
    } else {
      mcArr = [...userAnsweredMc, ...userUnansweredMc];
    }

    let mc_questions;

    if (mcArr.length === 0 || mcArr[0] === undefined) {
      if (view === 'unanswered') {
        mc_questions = "Good job, you've answered everything!"
      } else {
        mc_questions = "You haven't answered anything - get going!"
      }
    } else {
      mc_questions = mcArr.map((mcObj, idx) => (
        <McEdit key={idx} mcObj={mcObj} />
        ));
    }

    if(!mc_questions) {
      return null;
    }

    return (
      <div className="mc-con">
        <div className="mc-side-bar">
          <h4 className="side-bar-head">Your questions</h4>
          <p className="side-bar-info">
            answer more questions and get a good match
          </p>
          <button
            id="mc-all"
            className="side-bar-btn answered"
            onClick={handleClick}
          >
            all
          </button>
          <button
            id="mc-answered"
            className="side-bar-btn answered"
            onClick={handleClick}
          >
            answered
          </button>
          <button
            id="mc-unanswered"
            className="side-bar-btn new"
            onClick={handleClick}
          >
            new
          </button>
        </div>
        <div className="mc-ques-con">
          {mc_questions}
          {/* {mcArr.map((mcObj, idx) => (
            <McEdit key={idx} mcObj={mcObj} />
          ))} */}
        </div>
      </div>
    );
  }
}
