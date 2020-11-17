import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, {Fragment} from 'react';
import {
	Column, Row,
	useExpanded, UseExpandedRowProps,
	useTable
} from 'react-table'

export interface TableProps {
	data: Array<any>;
	columns: Array<Column>;
}

export function Table(props: TableProps): JSX.Element | null {

	const expanderCol : Column = React.useMemo(() =>
		({
		// Make an expander cell
		Header: () => null, // No header
		id: 'expander', // It needs an ID
		Cell: ({row}: {row: UseExpandedRowProps<any>})  => (
			row.canExpand ? (
				<span {...row.getToggleRowExpandedProps()}>
					 {row.isExpanded ? '▼' : '►'}
				</span>
			) : null
		)
	  }), []);

	const tableColumns = React.useMemo(() =>
		[expanderCol,...props.columns], [props.columns, expanderCol]);

	const renderSubRow = React.useCallback(({row}) => (
		<pre
			style={{
				fontSize: '10px',
			}}
		>
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
	), []);

	// Use the state and functions returned from useTable to build your UI
	const {getTableProps, headerGroups, rows, prepareRow, visibleColumns} = useTable({
		columns: tableColumns,
		data: props.data,
	}, useExpanded)

	return (
		<MaUTable {...getTableProps()}>
			<TableHead>
				{headerGroups.map(headerGroup => (
					<TableRow {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<TableCell {...column.getHeaderProps()}>
								{column.render('Header')}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableHead>
			<TableBody>
				{rows.map(row => {
					prepareRow(row);
					return (<Fragment {...row.getRowProps()}>
						<TableRow {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <TableCell  {...cell.getCellProps()}>
									{cell.render('Cell')}
								</TableCell>
							})
							}
						</TableRow>
						{row.isExpanded && (<TableRow {...row.getRowProps()}>
								{/*use visibleColumns to span all coumns and thus create space for inner table*/}
								<TableCell colSpan={visibleColumns.length}>
									{renderSubRow({row})}
								</TableCell>
						</TableRow>)
						}
					</Fragment>);
				})}
			</TableBody>
		</MaUTable>
	);
}
