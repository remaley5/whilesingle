import React from 'react';

// import context provider component
import {FrContextProvider} from '../context/fr_context';

// import fr components to show in the view
import FrContainer from '../components/fr_questions/FrContainer';

export default function UserFrView() {

	return (
		<FrContextProvider>
			<FrContainer/>
				{/* other ish in here? */}
		</FrContextProvider>
	)
}
