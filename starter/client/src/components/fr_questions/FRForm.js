import React, { useState } from "react";

export default function FRForm({fr}) {
	// get user id from context - hardcode for now
	const user_id = 3;

	let {fr_answer, fr_question, fr_question_id, fr_response_id} = fr
	if(!fr_response_id) {
		fr_response_id = null
	}
	console.log(fr_response_id)
	const [response, setResponse] = useState(fr_answer || "");

	const handleSubmit = (e) => {
		e.preventDefault();
		// if the response already exists in db we want to update it
		const url = `/api/questions/fr/${user_id}/answer`
		// const url = fr_response_id ?  `api/questions/fr/answer/r${fr_response_id}` : `api/questions/fr/answer/${user_id}/q${fr_question_id}`;

		const body = JSON.stringify({
			question_id: fr_question_id,
			response_id: fr_response_id,
			response,
		});

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body,
		}
		fetch(url, options)
  };

  const handleChange = (e) => {
    console.log(e);
    setResponse(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{fr_question}</div>
      <input
        type="textarea"
        placeholder="write some ish"
        value={response}
        onChange={handleChange}
      />
      <button>Write</button>
    </form>
  );
}
