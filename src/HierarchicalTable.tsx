import * as _ from 'lodash';
import React from 'react';
import {Column, Row} from 'react-table';
import {Table} from './Table';
import {Item} from './model';
import './HierarchicalTable.css';
import { ReactComponent as TrashIcon } from './img/trash.svg';

export interface HierarchicalTableContainerProps {
	data: Item[];
	rootColumnHeader?: string;
	onDelete?: (rowId: number) => void;
}

export function HierarchicalTable({data, rootColumnHeader, onDelete }: HierarchicalTableContainerProps) {
	const expanderColumn = React.useMemo(() => ({
		Header: () => null,
		id: 'expander',
		Cell: ({row}: { row: Row<Item> }) => (
			row.canExpand ? (
				<span {...row.getToggleRowExpandedProps()}>
						 {row.isExpanded ? '▼' : '►'}
					</span>
			) : null
		)
	}), []);

	const deleteActionColumn : Column<Item> | undefined = React.useMemo(() =>
		onDelete && ({
			Header: () => null,
			id: 'delete',
			Cell: ({row}: { row: Row<Item> }) => (
				<span className="delete" {...row.getRowProps()} onClick={() => onDelete(row.index)}>
					<TrashIcon />
				</span>
			)
		}), [onDelete]);

const dataColumns: Column<Item>[] = React.useMemo(() => _.chain(data)
	.flatMap(i => Object.keys(i.data))
	.uniq()
	.map<Column<Item>>(c => ({Header: c, accessor: `data.${c}`} as Column<Item>))
	.value(), [data]);

const columnsWithExpander = React.useMemo(() => deleteActionColumn ? [expanderColumn, ...dataColumns, deleteActionColumn] : [expanderColumn, ...dataColumns], [expanderColumn, dataColumns, deleteActionColumn]);

const tableColumns: Column<Item>[] = React.useMemo(() => rootColumnHeader ? [{
	Header: rootColumnHeader,
	columns: columnsWithExpander
}] : columnsWithExpander, [rootColumnHeader, columnsWithExpander]);


const tableData = React.useMemo(() => data, [data]);

const renderSubRow = React.useCallback(({row}: { row: Row<Item> }) => {
	const entries = row.original.kids && Object.entries(row.original.kids);
	if (entries) {
		return entries.map(([kidsKey, kidsValue], index) => <HierarchicalTable key={index} rootColumnHeader={kidsKey} data={kidsValue.records} />)
	}
	return null;
}, []);

const getSubRows = React.useCallback((originalRow: Item) => originalRow.kids ? Object.values(originalRow.kids).flatMap(kidRecord => kidRecord.records) : [], []);

return (
	<Table columns={tableColumns} data={tableData} renderSubRow={renderSubRow} getSubRows={getSubRows} />
)
}
