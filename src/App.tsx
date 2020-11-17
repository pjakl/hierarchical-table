import CssBaseline from '@material-ui/core/CssBaseline';
import * as _ from 'lodash';
import React from 'react';
import {Column} from 'react-table';
import './App.css';
import input from './data.json';
import {Table} from './Table';


function App() {

	const columns: Column[] = React.useMemo(() => _.chain(input)
		.flatMap(i => Object.keys(i.data))
		.uniq()
		.map(c => ({Header: c, accessor: c}) as Column)
		.value(), []);

	const data = React.useMemo(() => input.map(i => ({...i.data, subRows: !_.isEmpty(i.kids) ? [i.kids] : undefined})), []);


	return (
		<div className="App">
			<CssBaseline />
			<Table data={data} columns={columns} />
		</div>
	);
}

export default App;
