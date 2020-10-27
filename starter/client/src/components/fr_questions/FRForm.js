import React, { useState } from "react";

export default function FRForm({frObj}) {
	const {fr_answer, fr_question, fr_question_id} = frObj

	// get user id from context - hardcode for now
	const user_id = 3;

	const [response, setResponse] = useState(fr_answer || "");

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = `/api/questions/fr/${user_id}/answer`
		const body = JSON.stringify({
			question_id: fr_question_id,
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
