import React, { useState, useContext } from "react";
import AuthContext from '../../auth';

export default function McUserForm({ mcObj }) {
  const {fetchWithCSRF} = useContext(AuthContext);


	const { mc_answer_id: user_mc_answer_id, mc_question, mc_question_id, mc_answer_options } = mcObj;
  console.log(mcObj);
  console.log(mc_answer_options);
  // get user id from context - hardcode for now
  const user_id = 3;


  const handleClick = (e) => {
		const url = `/api/questions/mc/${user_id}/answer`;
    const body = JSON.stringify({
			question_id: e.target.name,
			answer_id: e.target.id,
    });
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    fetchWithCSRF(url, options);
	};

  return (
    <form>
      <div>{mc_question}</div>
      {mc_answer_options.map(({ mc_answer, mc_answer_id }, idx) => {
        return (
          <div key={idx}>
            <input type="radio" name={mc_question_id} id={mc_answer_id} defaultChecked={user_mc_answer_id === mc_answer_id ? true : false} onClick={handleClick} />
            <label htmlFor={mc_question_id}>{mc_answer}</label>
          </div>
        );
      })}
    </form>
  );
}
