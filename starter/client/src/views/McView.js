import React from 'react';

// import context provider component
import {McContextProvider} from '../context/mc_context';

// import mc components to show in the view
import McViewContainer from '../components/mc_questions/McViewContainer';
import McEditContainer from '../components/mc_questions/McEditContainer';


export default function McView() {

	// if user wants to change their mc questions we set show to 'edit'. Otherwise it renders the match view
	const show = 'view'

	return (
		<McContextProvider>
			{show === 'edit' ? <McEditContainer/> : <McViewContainer/>}
		</McContextProvider>
	)
}
