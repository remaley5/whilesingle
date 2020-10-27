import React from 'react';

// import context provider component
import {MatchFrContextProvider} from '../context/match_fr_context';

// import fr components to show in the view
import FRContainer from '../components/fr_questions/FrContainer';

export default function MatchFrView() {

	return (
		<MatchFrContextProvider>
			<FRContainer/>
				{/* other ish in here? */}
		</MatchFrContextProvider>
	)
}
