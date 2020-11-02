import React, { useContext, useState } from "react";

import { McContext } from "../../context/mc_context";
import McEdit from "./McEdit";
import McView from "./McView";
import { button, buttonGroup } from "@material-ui/core";

export default function McContainer({ edit }) {
  const mcContext = useContext(McContext);
  const { userAnsweredMc, userUnansweredMc, setUpdated } = mcContext;
  const [view, setView] = useState("unanswered");
  let mcArr = [];

  if (!edit) {
    mcArr = [...userAnsweredMc];
    // console.log("edit false", mcArr);
    return (
      <>
        {mcArr.map((mcObj, idx) => (
          <McView key={idx} mcObj={mcObj} />
        ))}
      </>
    );
  } else {
    const handleClick = (newView) => {
      setView(newView);
      setUpdated(false);
    };

    if (view === "unanswered") {
      mcArr = userUnansweredMc;
    } else if (view === "answered") {
      mcArr = userAnsweredMc;
    } else {
      mcArr = [...userAnsweredMc, ...userUnansweredMc];
    }

    let mc_questions;

    if (mcArr.length === 0 || mcArr[0] === undefined) {
      if (view === "unanswered") {
        mc_questions = "Good job, you've answered everything!";
      } else {
        mc_questions = "You haven't answered anything - get going!";
      }
    } else {
      mc_questions = mcArr.map((mcObj, idx) => (
        <McEdit key={idx} mcObj={mcObj} />
      ));
    }

    if (!mc_questions) {
      return null;
    }

    return (
      <div className="mc-con">
        <div className="mc-side-bar">
          <h4 className="side-bar-head">Your questions</h4>
          <p className="side-bar-info">
            answer more questions and get a good match
          </p>
          <div className='mc-btns'
            color="primary"
            aria-label="outlined primary button group"
						orientation="vertical"
						// className="MuibuttonBase-root Muibutton-root Muibutton-text"
						// className='mc-side-bar'
          >
            <button
              className='mc-btn'
              id="mc-all"
              className="side-bar-btn answered"
              onClick={()=>handleClick('all')}
            >
              all
            </button>
            <button
              className='mc-btn'
              id="mc-answered"
              className="side-bar-btn answered"
              onClick={()=>handleClick('answered')}
            >
              answered
            </button>
            <button
              className='mc-btn'
              id="mc-unanswered"
              className="side-bar-btn new"
              onClick={()=>handleClick('unanswered')}
              selected={true}
            >
              new
            </button>
          </div>
        </div>
        <div className="mc">{mc_questions}</div>
      </div>
    );
  }
}
