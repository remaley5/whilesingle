import React, { useContext } from "react";
import { FRContext } from "../../components/questions/fr_context";

export default function FRForm ({}) {
	const [state, dispatch] = useContext(FRContext)

	return (
		<>
			<div>I am a FR Form component</div>
		</>
	)
}
