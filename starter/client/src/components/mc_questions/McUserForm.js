import React, { useContext } from "react";
import AuthContext from "../../auth";

export default function McUserForm({ mcObj }) {
  const { fetchWithCSRF } = useContext(AuthContext);
// use state for controlled form inputs!!!!
  // then use effect hook that pulls from state on change and makes post request
  const {
    mc_answer_id: user_mc_answer_id,
    mc_question,
    mc_question_id,
    mc_answer_options,
  } = mcObj;
  console.log(mcObj);
  console.log(mc_answer_options);
  // get user id from context - hardcode for now
  const user_id = 3;

  const form_id = `${mc_question_id}-form`;

  const handleClick = (e) => {
    const form = document.getElementById(form_id);
    console.log(form.elements);

    let question_weight = 1;
		let unacceptable_answers = [];
		let answer_id = null;
    const els = form.elements;
    for (let i = 0; i < els.length; i++) {
      const el = els[i];
      if (el.id.startsWith("unacceptable") && el.checked) {
        unacceptable_answers.push(parseInt(el.id.slice(13), 10));
      } else if (el.id.startsWith("weight")) {
        question_weight = parseInt(el.value, 10);
			} else if (el.id.startsWith('answer') && el.checked) {
				answer_id = parseInt(el.id.slice(7),10)
			}
    }
    console.log(unacceptable_answers);

    const url = `/api/questions/mc/${user_id}/answer`;
    const body = JSON.stringify({
      question_id: mc_question_id,
      answer_id,
      unacceptable_answers,
      question_weight,
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

  // need to add defaultChecked to checkboxes based on unacceptable_answers array from database
  // also need to add weighting from database
  return (
    <form id={form_id}>
      <div>{mc_question}</div>
      <label htmlFor={mc_question_id}>Weight</label>
      <select
        onClick={handleClick}
        name={mc_question_id}
        id={`weight-${mc_question_id}`}
      >
        <option value="1">Less Important</option>
        <option value="2">Neutral</option>
        <option value="3">More Important</option>
      </select>
      {mc_answer_options.map(({ mc_answer, mc_answer_id }, idx) => {
        return (
          <div key={idx}>
            <input
              type="radio"
              name={mc_question_id}
              id={`answer-${mc_answer_id}`}
              defaultChecked={user_mc_answer_id === mc_answer_id ? true : false}
              onClick={handleClick}
            />
            <label htmlFor={mc_question_id}>{mc_answer}</label>
            <input
              type="checkbox"
              name={mc_question_id}
              id={`unacceptable-${mc_answer_id}`}
              onClick={handleClick}
            />
          </div>
        );
      })}
    </form>
  );
}
