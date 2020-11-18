import * as _ from 'lodash';
import React from 'react';
import {Column, Row, UseExpandedRowProps} from 'react-table';
import {HierarchicalTable} from './HierarchicalTable';
import {Item} from './model';

export interface HierarchicalTableContainerProps {
	data: Item[];
	rootColumnHeader?: string;
	isDeletable?: boolean;
	onDelete?: (rowId: number) => void;
}

export function HierarchicalTableContainer(props: HierarchicalTableContainerProps) {
	const expanderColumn = React.useMemo(() => ({
		Header: () => null, // No header
		id: 'expander', // It needs an ID
		Cell: ({row}: { row: UseExpandedRowProps<any> }) => (
			row.canExpand ? (
				<span {...row.getToggleRowExpandedProps()}>
						 {row.isExpanded ? '▼' : '►'}
					</span>
			) : null
		)
	}), []);
	const dataColumns: Column<Item>[] = React.useMemo(() => _.chain(props.data)
		.flatMap(i => Object.keys(i.data))
		.uniq()
		.map<Column<Item>>(c => ({Header: c, accessor: `data.${c}`} as Column<Item>))
		.value(), [props.data]);

	const columnsWithExpander = React.useMemo(() => [expanderColumn, ...dataColumns], [props.data]);

	const tableColumns: Column<Item>[] = React.useMemo(() => props.rootColumnHeader ? [{Header: props.rootColumnHeader, columns: columnsWithExpander}] : columnsWithExpander, []);

	const tableData = React.useMemo(() => props.data, [props.data]);

	const renderSubRow = React.useCallback(({row}: { row: Row<Item> }) => {
		const entries = row.original.kids && Object.entries(row.original.kids);
		if(entries) {
			return entries.map(([kidsKey, kidsValue]) => <HierarchicalTableContainer rootColumnHeader={kidsKey} data={kidsValue.records} />)
		}
		return null;
	}, []);

	return (
		<HierarchicalTable columns={tableColumns} data={tableData} renderSubRow={renderSubRow} />
	)
}
