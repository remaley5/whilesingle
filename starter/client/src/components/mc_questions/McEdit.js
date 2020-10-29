import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../auth";

export default function McUserForm({ mcObj }) {
  const { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);
  const [changed, setChanged] = useState(0);
  const {
    mc_answer_id: user_mc_answer_id,
    mc_question,
    mc_question_id,
    mc_answer_options,
    question_weight,
    unacceptable_answers,
  } = mcObj;

  // use ref for controlled form inputs that don't trigger re-renders!!!! .... except you call setChanged within functions that change ref so component rerenders anyways. Oh well.
  const answerIdRef = useRef(user_mc_answer_id || null);
  const unacceptableRef = useRef(unacceptable_answers || []);
  const weightRef = useRef(question_weight || 1);

  const handleAnswer = (e) => {
    const id = parseInt(e.target.id.slice(7), 10);
    answerIdRef.current = id;
    setChanged(changed + 1);
  };

  const handleUnacceptable = (e) => {
    const id = parseInt(e.target.id.slice(13), 10);
    const idx = unacceptableRef.current.indexOf(id);
    const checked = e.target.checked;
    let unacceptable = unacceptableRef.current;
    if (checked === true && idx === -1) {
      unacceptableRef.current = [...unacceptable, id];
    } else if (checked === false && idx !== -1) {
      unacceptableRef.current = [
        ...unacceptable.slice(0, idx),
        ...unacceptable.slice(idx + 1),
      ];
    }
    setChanged(changed + 1);
  };

  const handleWeight = (e) => {
    const new_weight = parseInt(e.target.value, 10);
    weightRef.current = new_weight;
    setChanged(changed + 1);
  };

  const handleSubmit = (e) => {
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
  };

	// post response whenever a change is made
	// there's gotta be a better way but whatever - this works.
  useEffect(() => {
    handleSubmit();
  }, [changed]);

  return (
    <div>
      <div>
        <span>{mc_question}</span>
        <span>
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
        </span>
      </div>
      <div>
        {mc_answer_options.map(({ mc_answer, mc_answer_id }, idx) => {
          return (
            <div key={idx}>
              <input
                required
                type="radio"
                name={mc_question_id}
                id={`answer-${mc_answer_id}`}
                defaultChecked={
                  user_mc_answer_id === mc_answer_id ? true : false
                }
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
      </div>
    </div>
  );
}