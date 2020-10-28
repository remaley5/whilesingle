import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../auth";

export default function McUserForm({ mcObj }) {
  const { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
	const [changed, setChanged] = useState(0)
  const {
    mc_answer_id: user_mc_answer_id,
    mc_question,
    mc_question_id,
    mc_answer_options,
    question_weight,
    unacceptable_answers,
  } = mcObj;
  // use ref for controlled form inputs that don't trigger re-renders!!!!
	const answerIdRef = useRef(user_mc_answer_id || null)
  const unacceptableRef = useRef(unacceptable_answers || []);
  const weightRef = useRef(question_weight || 1);
  // console.log(question_weight, unacceptable_answers)
  // console.log('answer_id', user_mc_answer_id)
	console.log(user_id)
  // then use effect hook that pulls from state on change and makes post request

  const handleAnswer = (e) => {
    const id = parseInt(e.target.id.slice(7), 10);
		answerIdRef.current = id;
		setChanged(changed + 1)
  };

  const handleUnacceptable = (e) => {
    const id = parseInt(e.target.id.slice(13), 10);
    const idx = unacceptableRef.current.indexOf(id);
		const checked = e.target.checked;
		let unacceptable = unacceptableRef.current
    if (checked === true && idx === -1) {
      unacceptableRef.current = [...unacceptable, id];
    } else if (checked === false && idx !== -1) {
      unacceptableRef.current = [
        ...unacceptable.slice(0, idx),
        ...unacceptable.slice(idx + 1),
      ];
		}
		setChanged(changed + 1)

  };

  const handleWeight = (e) => {
    const new_weight = parseInt(e.target.value, 10);
		weightRef.current = new_weight;
		setChanged(changed + 1)

  };

  // get user id from context - hardcode for now

  const form_id = `${mc_question_id}-form`;

  const handleSubmit = (e) => {
    // const form = document.getElementById(form_id);
    // console.log(form.elements);

    // let question_weight = 1;
    // let unacceptable_answers = [];
    // // let answer_id = null;
    // const els = form.elements;
    // for (let i = 0; i < els.length; i++) {
    //   const el = els[i];
    //   if (el.id.startsWith("unacceptable") && el.checked) {
    //     unacceptable_answers.push(parseInt(el.id.slice(13), 10));
    //   } else if (el.id.startsWith("weight")) {
    //     question_weight = parseInt(el.value, 10);
    //     // } else if (el.id.startsWith('answer') && el.checked) {
    //     // 	answer_id = parseInt(el.id.slice(7),10)
    //   }
    // }
    // console.log(unacceptable_answers);

    console.log(`hits handle submit
		answerId: ${answerIdRef.current}
		unacceptableRef.current: ${unacceptableRef.current}
		weightRef.current: ${weightRef.current}
	`);
    const url = `/api/questions/mc/${user_id}/answer`;
    const body = JSON.stringify({
      question_id: mc_question_id,
      answer_id: answerIdRef.current,
      unacceptable_answers: unacceptableRef.current,
      question_weight: weightRef.current,
    });
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
		fetchWithCSRF(url, options);
		console.log(body)
  };

  // should mimic componentWillUnmount and submit when leaving the page
  useEffect(() => {
		console.log(unacceptableRef)
    console.log(`hits use effect
			answerIdRef.current: ${answerIdRef.current}
			unacceptableRef.current: ${unacceptableRef.current}
			weightRef.current: ${weightRef.current}
		`);
		// return handleSubmit;
		handleSubmit()
  }, [changed]);

  // need to add defaultChecked to checkboxes based on unacceptable_answers array from database
  // also need to add weighting from database
  return (
    <form id={form_id}>
      <div>{mc_question}</div>
      <label htmlFor={mc_question_id}>Weight</label>
      <select
        onChange={handleWeight}
        name={mc_question_id}
				id={`weight-${mc_question_id}`}
				value={weightRef.current}
      >
        <option value="1">Less Important</option>
				<option value="2">Neutral</option>
        <option value="3">More Important</option>
      </select>
      {mc_answer_options.map(({ mc_answer, mc_answer_id }, idx) => {
        return (
          <div key={idx}>
            <input
              required
              type="radio"
              name={mc_question_id}
              id={`answer-${mc_answer_id}`}
              defaultChecked={user_mc_answer_id === mc_answer_id ? true : false}
              onChange={handleAnswer}
            />
            <label htmlFor={mc_question_id}>{mc_answer}</label>
            <input
							type="checkbox"
							checked={unacceptableRef.current.indexOf(mc_answer_id) !== -1}
              name={mc_question_id}
              id={`unacceptable-${mc_answer_id}`}
              onChange={handleUnacceptable}
            />
          </div>
        );
      })}
    </form>
  );
}
