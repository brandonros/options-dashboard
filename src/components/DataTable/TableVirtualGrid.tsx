import React, { forwardRef, useEffect } from 'react';
import { VariableSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TableVirtualGridProps } from '../../types';
import { TableCell } from './TableCell';
import { calculateColumnWidth } from '../../utils/tableUtils';

export const TableVirtualGrid = forwardRef<VariableSizeGrid, TableVirtualGridProps>(({
    columns,
    rows,
    hoverRowIndex,
    sorts,
    onScroll,
    onRowHover,
    onRowClick
}, ref) => {
    useEffect(() => {
        if (ref && 'current' in ref && ref.current) {
            ref.current.resetAfterColumnIndex(0, true);
        }
    }, [sorts]);
    
    const getColumnWidth = (index: number) => {
        const column = columns[index];
        return calculateColumnWidth(sorts, column);
    };

    const getRowHeight = () => 20; // Could be made configurable

    return (
        <AutoSizer doNotBailOutOnEmptyChildren={true} data-testid="auto-sizer">
            {({ height, width }) => {
                return (
                    <VariableSizeGrid
                        className='table-virtual-grid'
                        ref={ref}
                        width={width}
                        height={height}
                        columnCount={columns.length}
                        columnWidth={getColumnWidth}
                        rowCount={rows.length}
                        rowHeight={getRowHeight}
                        onScroll={onScroll}
                    >
                        {({ columnIndex, rowIndex, style }) => {
                            return (
                                <TableCell
                                    columnIndex={columnIndex}
                                    rowIndex={rowIndex}
                                    style={style}
                                    columns={columns}
                                    rows={rows}
                                    hoverRowIndex={hoverRowIndex}
                                    onRowHover={onRowHover}
                                    onRowClick={onRowClick}
                                />
                            );
                        }}
                    </VariableSizeGrid>
                );
            }}
        </AutoSizer>
    );
});