import React from 'react';

// import context provider component
import {FrContextProvider} from '../context/fr_context';

// import fr components to show in the view
import FrContainer from '../components/fr_questions/FrContainer';

export default function FrView() {

	const person = 'user'
	// change to 'match' or 'user'

	return (
		<FrContextProvider>
			<FrContainer view={person} />
				{/* other ish in here? */}
		</FrContextProvider>
	)
}
