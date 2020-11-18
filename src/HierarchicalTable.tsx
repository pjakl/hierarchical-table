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
	data: HierarchicalTableData;
}

export function HierarchicalTable(props: TableProps): JSX.Element | null {

	const expanderColumn = React.useMemo( () => ({
		Header: () => null, // No header
		id: 'expander', // It needs an ID
		Cell: ({row}: {row: UseExpandedRowProps<any>})  => (
			row.canExpand ? (
				<span {...row.getToggleRowExpandedProps()}>
						 {row.isExpanded ? '▼' : '►'}
					</span>
			) : null
		)
	}),[]);
	const dataColumns: Column<HierarchicalTableRow>[] = React.useMemo(() => _.chain(props.data?.rows)
				.flatMap(i => Object.keys(i.data))
				.uniq()
				.map<Column<HierarchicalTableRow>>(c => ({Header: c, accessor: `data.${c}`} as Column<HierarchicalTableRow>))
				.value(), [props.data]);

	const columnsWithExpander = React.useMemo(() => [expanderColumn, ...dataColumns], [props.data]);

	const tableColumns: Column<HierarchicalTableRow>[] =React.useMemo(() => props.data?.rootKey ? [{Header: props.data.rootKey, columns: columnsWithExpander}] : columnsWithExpander, []);

	const tableData = React.useMemo(() => props.data?.rows, [props.data]);

	const renderSubRow = React.useCallback(({row}: {row: any}) =>
		<HierarchicalTable data={row.originalSubRows[0]}/>, []);

	const {getTableProps, headerGroups, rows, prepareRow, visibleColumns} = useTable<HierarchicalTableRow>({
		columns: tableColumns,
		data: tableData,
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
