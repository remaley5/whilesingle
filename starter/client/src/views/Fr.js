import React from 'react';

// import context provider component
import {FrContextProvider} from '../context/fr_context';

// import fr components to show in the view
import FrContainer from '../components/fr_questions/FrContainer';


export default function Fr({edit, updatedFr, setUpdatedFr}) {

	// if user wants to change their fr questions we set show to 'edit'. Otherwise it renders the match view
	// const show = 'view'

	return (
		<FrContextProvider>
			<FrContainer edit={edit} updatedFr={updatedFr} setUpdatedFr={setUpdatedFr}/>
		</FrContextProvider>
	)
}
