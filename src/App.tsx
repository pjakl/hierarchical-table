import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Row, Container} from 'react-bootstrap';
import {HierarchicalTable} from './HierarchicalTable';
import {Item} from './model';
import {arrayPlainToClass} from './validator';
import './App.css';

function App() {
	const [items, setItemState] = useState<Item[]>([]);
	const [file, setFile] = useState<File>();

	const validateAndSet = async () => {
		if (file) {
			const reader = new FileReader();
			reader.onload = async () => {
				if (reader.result) {
					const items = await arrayPlainToClass(JSON.parse(reader.result as string), () => new Item());
					setItemState(items);
				}
			}
			reader.readAsText(file);
		}
	};

	useEffect(() => {
		validateAndSet();
		return () => setFile(undefined);
	});

	const handleDelete = (index: number) => {
		const newItems = items.filter((val, idx) => index !== idx);
		setItemState(newItems);
	}

	return (
		<div className="App">
			<Container fluid>
				<Row xl={4}>
					<Form>
						<FormGroup>
							<Form.File data-testid="fileUpload" label="Input file" required custom
									   onChange={(e: any) => setFile(e.target.files[0])} />
						</FormGroup>
					</Form>
				</Row>
				<Row xl={1}>
					<HierarchicalTable data={items} onDelete={(index) => handleDelete(index)} />
				</Row>
			</Container>
		</div>
	);
}

export default App;
