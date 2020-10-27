import React from 'react';


export default function FRForm({fr}) {
	// const [allFr, loading] = useContext(FRContext)
	console.log(fr)
	const [questionId] = Object.keys(fr);
	console.log(questionId)
	const {fr_question} = fr[questionId]
	console.log(fr_question);
	return (
		<>
			<div>{fr_question}</div>
			<div></div>
		</>
	)
}
