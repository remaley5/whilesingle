import React from 'react';

// import context provider component
import {McContextProvider} from '../context/mc_context';

// import mc components to show in the view
import McContainer from '../components/mc_questions/McContainer';


export default function Mc() { //{edit}
	// if user wants to change their mc questions we set show to 'edit'. Otherwise it renders the match view
	// const show = 'view'
	// console.log('hits', show)
	const edit = true
	return (
		<McContextProvider>
			<McContainer edit={edit}/>
		</McContextProvider>
	)
}
