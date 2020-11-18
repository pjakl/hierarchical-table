import * as _ from 'lodash';
import React from 'react';
import './App.css';
import {HierarchicalTable} from './HierarchicalTable';
import input from './nestedData';


function App() {

	return (
		<div className="App">
			<HierarchicalTable data={input} />
		</div>
	);
}

export default App;
