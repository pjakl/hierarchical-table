import React, {useEffect, useState} from 'react';
import './App.css';
import inputJson from './sample-data.json';
import {HierarchicalTable} from './HierarchicalTable';
import {Item} from './model';
import {arrayPlainToClass} from './validator';

function App() {
	const [items,  setItemState] = useState<Item[]>([]);
	const validateAndSet =  async () => {
		const items = await arrayPlainToClass(inputJson, () => new Item());
		setItemState(items);
	}

	useEffect(() => {
		validateAndSet()
	}, []);

	const handleDelete = (index: number) => {
		const newItems = items.filter((val, idx) => index !== idx);
		setItemState(newItems);
	}

	return (
		<div className="App">
			<HierarchicalTable data={items} onDelete={(index) => handleDelete(index)} />
		</div>
	);
}

export default App;
