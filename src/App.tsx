import React from 'react';
import './App.css';
import {HierarchicalTableContainer} from './HierarchicalTableContainer';
import input from './nestedData';


function App() {

	return (
		<div className="App">
			<HierarchicalTableContainer data={input} />
		</div>
	);
}

export default App;
