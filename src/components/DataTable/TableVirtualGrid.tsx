import React, { forwardRef } from 'react';
import { VariableSizeGrid, GridOnScrollProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TableVirtualGridProps } from '../../types';
import { TableCell } from './TableCell';

export const TableVirtualGrid = forwardRef<VariableSizeGrid, TableVirtualGridProps>(({
    columns,
    rows,
    hoverRowIndex,
    onScroll,
    onRowHover,
    onRowClick
}, ref) => {
    const getColumnWidth = (index: number) => columns[index].width;
    const getRowHeight = () => 20; // Could be made configurable

    return (
        <AutoSizer>
            {({ height, width }) => (
                <VariableSizeGrid
                    ref={ref}
                    width={width}
                    height={height}
                    columnCount={columns.length}
                    columnWidth={getColumnWidth}
                    rowCount={rows.length}
                    rowHeight={getRowHeight}
                    onScroll={onScroll}
                >
                    {({ columnIndex, rowIndex, style }) => (
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
                    )}
                </VariableSizeGrid>
            )}
        </AutoSizer>
    );
});