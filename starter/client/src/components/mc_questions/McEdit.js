import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../auth";
import McEditSelect from "./McEditSelect";

export default function McEdit({ mcObj }) {

	const[loading, setLoading] = useState(true)
  const [answerIdState, setAnswerIdState] = useState();
	const [unacceptableState, setUnacceptableState] = useState();
  const [weightState, setWeightState] = useState();

	const { fetchWithCSRF, currentUserId: user_id } = useContext(AuthContext);

  const {
    mc_answer_id: user_mc_answer_id,
    mc_question,
    mc_question_id,
    mc_answer_options,
    question_weight,
    unacceptable_answers,
	} = mcObj;

	useEffect(()=>{
		setAnswerIdState(user_mc_answer_id)
		setUnacceptableState(unacceptable_answers||[])
		setWeightState(question_weight||2)
		setLoading(false)
	}, [])



  useEffect(() => {
    if (answerIdState!==undefined && !loading) {
      const url = `/api/questions/mc/${user_id}/answer`;
      const body = JSON.stringify({
        question_id: mc_question_id,
        answer_id: answerIdState,
        unacceptable_answers: unacceptableState,
        question_weight: weightState,
      });
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      };
      fetchWithCSRF(url, options);
    }
  }, [answerIdState, unacceptableState, weightState, user_id, fetchWithCSRF, loading]);

	const handleAnswer = (e) => {
    setAnswerIdState(parseInt(e.target.id.slice(7), 10));
  };

  const handleUnacceptable = (e) => {
    const id = parseInt(e.target.id.slice(13), 10);
    const idx = unacceptableState.indexOf(id);
    const checked = e.target.checked;
    let newUnacceptable = [...unacceptableState];
    if (checked === true && idx === -1) {
      newUnacceptable.push(id);
    } else if (checked === false && idx !== -1) {
      newUnacceptable = [
        ...newUnacceptable.slice(0, idx),
        ...newUnacceptable.slice(idx + 1),
      ];
    }
    setUnacceptableState(newUnacceptable);
  };

  const handleWeight = (e) => {
    setWeightState(parseInt(e.target.value, 10));
  };

	if(loading){
		return null;
	}

  const weightProps = {
    handleChange: handleWeight,
    name: `weight-${mc_question_id}`,
    id: `weight-${mc_question_id}`,
    value: weightState,
    options: [
      ["1", "Less Important"],
      ["2", "Neutral"],
      ["3", "More Important"],
    ],
  };

  return (
    <div className="mc-ques-con">
      <h4 className="ques-head">{mc_question}</h4>
      {/* I think the McEditSelect should be on the same line as the question prompt - flexbox? */}
      <div className='ques-con'>
        {mc_answer_options.map(({ mc_answer, mc_answer_id }, idx) => {
          return (
            <div className='mc-opt' key={idx}>
              <input
                className="mc-sel mc-sel-radio"
                required
                type="radio"
                name={`question-${mc_question_id}`}
								id={`answer-${mc_answer_id}`}
                defaultChecked={answerIdState === mc_answer_id}
                onChange={handleAnswer}
              />
              <label
                className="mc-sel-label"
                htmlFor={`answer-${mc_question_id}`}
              >
                {mc_answer}
              </label>
              <input
                type="checkbox"
                className="mc-sel mc-sel-check"
                checked={unacceptableState.indexOf(mc_answer_id) !== -1}
                name={`unacceptable-${mc_question_id}`}
                id={`unacceptable-${mc_answer_id}`}
                onChange={handleUnacceptable}
              />
            </div>
          );
        })}
      </div>
        <McEditSelect props={weightProps} />
    </div>
  );
}
