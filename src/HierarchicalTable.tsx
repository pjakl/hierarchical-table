import BSTable from 'react-bootstrap/Table';
import * as _ from 'lodash';
import React, {Fragment} from 'react';
import {
	Column,
	useExpanded, UseExpandedRowProps,
	useTable
} from 'react-table'


export interface HierarchicalTableData {
	rootKey?: string;
	rows:  HierarchicalTableRow[];
}
export interface HierarchicalTableRow {
	data: Object;
	nested?: HierarchicalTableData;
}

export interface TableProps {
	columns: Column<HierarchicalTableRow>[];
	data: HierarchicalTableRow[];
	renderSubRow: ({row} :{row: Row<HierarchicalTableRow}) => JSX.Element | null;
}

export function HierarchicalTable(props: TableProps): JSX.Element | null {

	const {getTableProps, headerGroups, rows, prepareRow, visibleColumns} = useTable<HierarchicalTableRow>({
		columns: props.columns,
		data: props.data,
		getSubRows: (originalRow: HierarchicalTableRow) => originalRow.nested ? [originalRow.nested] : undefined as any, // type declaration is forcing to have same type for subrows
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
