import BSTable from 'react-bootstrap/Table';
import * as _ from 'lodash';
import React, {Fragment} from 'react';
import {
	Column, Row,
	useExpanded, UseExpandedRowProps,
	useTable
} from 'react-table'
import {Item} from './model';


export interface HierarchicalTableData {
	rootKey?: string;
	rows:  HierarchicalTableRow[];
}
export interface HierarchicalTableRow {
	data: Object;
	nested?: HierarchicalTableData;
}

export interface TableProps {
	columns: Column<Item>[];
	data: Item[];
	renderSubRow: ({row} :{row: Row<Item>}) => JSX.Element[]| null;
}

export function HierarchicalTable(props: TableProps): JSX.Element | null {

	const {getTableProps, headerGroups, rows, prepareRow, visibleColumns} = useTable<Item>({
		columns: props.columns,
		data: props.data,
		getSubRows: (originalRow: Item) => originalRow.kids ? Object.values(originalRow.kids).flatMap(kidRecord => kidRecord.records) : [],
		expandSubRows: false
	}, useExpanded)

	return (
		<BSTable bordered size="sm" {...getTableProps()}>
			<thead className="thead-dark">
				{headerGroups.map(headerGroup => (
					<tr className="table-group" {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{rows.map((row, i) => {
					prepareRow(row);
					return <Fragment key={row.getRowProps().key}>
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td  {...cell.getCellProps()}>
									{cell.render('Cell')}
								</td>
							})
							}
						</tr>
						{row.isExpanded ? (<tr key={`${row.getRowProps().key}_${i}`}>
							{/*use visibleColumns to span all columns and thus create space for inner table*/}
							<td colSpan={visibleColumns.length}>
								{props.renderSubRow({row})}
							</td>
						</tr>) : null
						}
					</Fragment>;
				})}
			</tbody>
		</BSTable>
	);
}
