import React from 'react';

// import context provider component
import {McContextProvider} from '../context/mc_context';

// import fr components to show in the view
import McContainer from '../components/mc_questions/McContainer';

export default function McView() {

	const person = 'user'
	// change to 'match' or 'user'

	return (
		<McContextProvider>
			<McContainer view={person} />
				{/* other ish in here? */}
		</McContextProvider>
	)
}
