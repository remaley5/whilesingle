import React from 'react';

// import context provider component
import {UserFrContextProvider} from '../context/user_fr_context';

// import fr components to show in the view
import FRContainer from '../components/fr_questions/FRContainer';

export default function FRView() {

	return (
		<UserFrContextProvider>
			<FRContainer/>
				{/* other ish in here? */}
		</UserFrContextProvider>
	)
}
