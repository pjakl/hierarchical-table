import React, {useEffect, useState} from 'react';
import './App.css';
import inputJson from './data.json';
import {HierarchicalTableContainer} from './HierarchicalTableContainer';
import {Item} from './model';
import {arrayPlainToClass} from './validator';

function App() {
	const [itemsState,  setItemState] = useState<Item[]>([]);
	const validateAndSet =  async () => {
		const items = await arrayPlainToClass(inputJson, () => new Item());
		setItemState(items);
	}

	useEffect(() => {
		validateAndSet()
	}, []);

	return (
		<div className="App">
			<HierarchicalTableContainer data={itemsState} />
		</div>
	);
}

export default App;
