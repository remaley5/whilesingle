import React, {useState} from 'react';
import FRForm from './FRForm'

export default function FRFormContainer({frObj}) {

	// const [allFr, loading] = useContext(FRContext)
	const [questionId] = Object.keys(frObj);
	console.log(questionId)

	const fr = frObj[questionId]

	return (
		<>
			<FRForm fr={fr} />
		</>
	)
}
