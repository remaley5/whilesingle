import React, {createContext, useReducer} from 'react';

// create context object
export const FRContext = createContext();

// create provider for components to consume/subscribe to changes
export const FRContextProvider = props => {
	// set up useState/useReducer hooks
	const [state, dispatch] = useReducer(reducer, initialState);

	// use effect hook so they are populated on page load?


	return (
		<FRContext.Provider value={[state, dispatch]}>
			{/*  */}
			{props.children}
		</FRContext.Provider>
	)
}
