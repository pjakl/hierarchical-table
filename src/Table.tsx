import BSTable from 'react-bootstrap/Table';
import React, {Fragment} from 'react';
import {
	Column, Row,
	useExpanded,
	useTable
} from 'react-table'

export interface TableProps<T extends Object> {
	columns: Column<T>[];
	data: T[];
	renderSubRow: ({row} :{row: Row<T>}) => JSX.Element[]| null;
	getSubRows: (originalRow: T) => T[],
}

export function Table<T extends Object>({columns, data, renderSubRow, getSubRows}: TableProps<T>): JSX.Element | null {

	const {getTableProps, headerGroups, rows, prepareRow, visibleColumns} = useTable<T>({
		columns: columns,
		data: data,
		getSubRows,
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
								{renderSubRow({row})}
							</td>
						</tr>) : null
						}
					</Fragment>;
				})}
			</tbody>
		</BSTable>
	);
}
