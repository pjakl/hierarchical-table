import * as enzyme from 'enzyme';
import React from 'react';
import {Column, Row} from 'react-table';
import {Item} from './model';
import {Table} from './Table';

export interface Data {
	key1: string;
	key2: string;
	nested?: Data;
}

const columns: Column<Data>[] = [
	{Header: 'key1', accessor: 'key1'},
	{Header: 'key2', accessor: 'key2'}
];

const expanderColumn = {
	Header: () => null,
	id: 'expander',
	Cell: ({row}: { row: Row<Item> }) => (
		row.canExpand ? (
			<span {...row.getToggleRowExpandedProps()}>
						 {row.isExpanded ? '▼' : '►'}
					</span>
		) : null)
};

const data: Data[] = [
	{key1: 'cell_1_1', key2: 'cell_1_2'},
	{key1: 'cell_2_1', key2: 'cell_2_2', nested: {key1: 'nestedCell_1_1', key2: 'nestedCell_1_2'}}
];

test('should render table with header and proper header titles', async () => {

	const wrapper = enzyme.shallow(<Table columns={columns} data={data} />)

	expect(wrapper.find('table')).toBeDefined();

	const header = wrapper.find('thead tr');
	expect(header.children()).toHaveLength(2);
	expect(header.find('th').at(0).text()).toEqual('key1');
	expect(header.find('th').at(1).text()).toEqual('key2');
});

test('should render table with proper table cells', async () => {
	// mount to render also children
	const wrapper = enzyme.mount(<Table columns={columns} data={data} />)

	expect(wrapper.find('table')).toBeDefined();

	const rows = wrapper.find('tbody tr');
	expect(rows.at(0).find('td').at(0).text()).toEqual('cell_1_1');
	expect(rows.at(0).find('td').at(1).text()).toEqual('cell_1_2');
	expect(rows.at(1).find('td').at(0).text()).toEqual('cell_2_1');
	expect(rows.at(1).find('td').at(1).text()).toEqual('cell_2_2');
});

test('should render expander only on columns with nested data', async () => {
	// mount to render also children
	const wrapper = enzyme.mount(<Table columns={[expanderColumn, ...columns]} data={data}
										getSubRows={(item: Data) => (item.nested ? [item.nested] : [])}
										renderSubRow={({row}) => [<div>{JSON.stringify(row.original)}</div>]}
	/>)

	expect(wrapper.find('table')).toBeDefined();

	const rows = wrapper.find('tbody tr');

	expect(rows.at(0).find('td').at(0).text()).toEqual('');
	expect(rows.at(1).find('td').at(0).text()).toEqual('►');
});

test('should render subRow upon click on expander', async () => {
	// mount to render also children
	const wrapper = enzyme.mount(<Table columns={[expanderColumn, ...columns]} data={data}
										getSubRows={(item: Data) => (item.nested ? [item.nested] : [])}
										renderSubRow={({row}) => [<span key="id">Works!</span>]}
	/>)

	expect(wrapper.find('table')).toBeDefined();

	wrapper.find('[title="Toggle Row Expanded"]').simulate('click');

	expect(wrapper.find('tbody tr td').last().text()).toEqual('Works!')

});

