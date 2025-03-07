import React, { forwardRef } from 'react';
import { VariableSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { TableVirtualGridProps } from '../../types';
import { TableCell } from './TableCell';
import { calculateColumnWidth } from '../../utils/tableUtils';

export const TableVirtualGrid = forwardRef<VariableSizeGrid, TableVirtualGridProps>(({
    columns,
    rows,
    hoverRowIndex,
    onScroll,
    onRowHover,
    onRowClick
}, ref) => {
    const getColumnWidth = (index: number) => {
        const column = columns[index];
        return calculateColumnWidth(column);
    };
    const getRowHeight = () => 20; // Could be made configurable

    console.log('TableVirtualGrid render:', {
        columnsLength: columns.length,
        rowsLength: rows.length,
    });

    return (
        <AutoSizer doNotBailOutOnEmptyChildren={true} data-testid="auto-sizer">
            {({ height, width }) => {
                console.log('AutoSizer dimensions:', { height, width });
                
                return (
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
                        {({ columnIndex, rowIndex, style }) => {
                            console.log('Rendering cell:', {
                                columnIndex,
                                rowIndex,
                                style,
                                columnData: columns[columnIndex],
                                rowData: rows[rowIndex]
                            });
                            
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