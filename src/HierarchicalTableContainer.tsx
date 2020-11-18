import * as _ from 'lodash';
import React from 'react';
import {Column, Row} from 'react-table';
import {HierarchicalTable} from './HierarchicalTable';
import {Item} from './model';
import './HierarchicalTableContainer.css';
import { ReactComponent as TrashIcon } from './img/trash.svg';

export interface HierarchicalTableContainerProps {
	data: Item[];
	rootColumnHeader?: string;
	onDelete?: (rowId: number) => void;
}

export function HierarchicalTableContainer({data, rootColumnHeader, onDelete }: HierarchicalTableContainerProps) {
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
		return entries.map(([kidsKey, kidsValue], index) => <HierarchicalTableContainer key={index}
																						rootColumnHeader={kidsKey}
																						data={kidsValue.records} />)
	}
	return null;
}, []);

return (
	<HierarchicalTable columns={tableColumns} data={tableData} renderSubRow={renderSubRow} />
)
}
