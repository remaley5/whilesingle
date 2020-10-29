import React from 'react';

// import context provider component
import {FrContextProvider} from '../context/fr_context';

// import fr components to show in the view
import FrViewContainer from '../components/fr_questions/FrViewContainer';
import FrEditContainer from '../components/fr_questions/FrEditContainer';


export default function FrView() {

	// if user wants to change their fr questions we set show to 'edit'. Otherwise it renders the match view
	const show = 'view'

	return (
		<FrContextProvider>
			{show === 'edit' ? <FrEditContainer/> : <FrViewContainer/>}
		</FrContextProvider>
	)
}
