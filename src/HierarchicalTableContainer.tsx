import {Type} from 'class-transformer';
import {IsArray, IsDefined, IsObject, IsOptional, ValidateNested} from 'class-validator';
import * as _ from 'lodash';
import React from 'react';
import {Column, Row, UseExpandedRowProps} from 'react-table';
import {HierarchicalTable, HierarchicalTableData, HierarchicalTableRow} from './HierarchicalTable';

export class Item {
	@IsDefined()
	data!: Object;
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => Kids)
	kids?: Kids
}

export class KidsRecords {
	@IsDefined()
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => Item)
	records!: Item[];
}

export class Kids {
	[rootKey: string]: KidsRecords;
}

export interface HierarchicalTableContainerProps {
	data: Item[];
}

export function HierarchicalTableContainer(props: HierarchicalTableContainerProps) {
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
	const dataColumns: Column<Item>[] = React.useMemo(() => _.chain(props.data)
		.flatMap(i => Object.keys(i.data))
		.uniq()
		.map<Column<Item>>(c => ({Header: c, accessor: `data.${c}`} as Column<Item>))
		.value(), [props.data]);

	const columnsWithExpander = React.useMemo(() => [expanderColumn, ...dataColumns], [props.data]);

	//const tableColumns: Column<Item>[] = React.useMemo(() => props.data?.rootKey ? [{Header: props.data.rootKey, columns: columnsWithExpander}] : columnsWithExpander, []);

	const tableData = React.useMemo(() => props.data, [props.data]);

	const renderSubRow = React.useCallback(({row}: {row: Row<Item>}) =>
		row.subRows && row.subRows.map((subRow : any) => <HierarchicalTableContainer data={subRow}/>), []);

	return (
		<HierarchicalTable columns={tableColumns} data={tableData} renderSubRow={renderSubRow} />
	)
}
