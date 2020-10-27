import React, {useContext} from 'react';

// import context provider component
import {FRContextProvider} from '../context/fr_context_all';

import {FRContext} from '../context/fr_context_all'

// import fr components to show in the view
import FRContainer from '../components/fr_questions/FRContainer';

export default function FRView() {

	return (
		<FRContextProvider>
			<FRContainer/>
				{/* other ish in here? */}
		</FRContextProvider>
	)
}
