import React from 'react';

// import context provider component
import {FRContextProvider} from '../context/questions/fr_context';

// import fr components to show in the view
import FRForm from '../components/questions/FRForm';

export default function FRView() {
	return (
		<FRContextProvider>
			<FRForm>
				{/* other ish in here? */}
			</FRForm>
		</FRContextProvider>
	)
}
