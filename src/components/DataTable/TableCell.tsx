import React from 'react';
import { TableCellProps, Row } from '../../types';

export const TableCell = ({
    columnIndex,
    rowIndex,
    style,
    columns,
    rows,
    hoverRowIndex,
    onRowHover,
    onRowClick,
}: TableCellProps) => {
    console.log('hoverRowIndex', hoverRowIndex);
    const columnName = columns[columnIndex].name;
    const columnType = columns[columnIndex].type;
    const row = rows[rowIndex];
    
    const cellStyle = {
        ...style,
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        borderLeft: columnIndex === 0 ? '1px solid black' : 'none', // left most cell
        backgroundColor: rowIndex === hoverRowIndex ? '#ffeb3b' : 'inherit',
        cursor: 'pointer',
        padding: `5px`,
        boxSizing: 'border-box' as const,
        display: 'flex',
    };

    const formatCellValue = (value: any, type: string) => {
        if (type === 'percentage') {
            return `${value}%`;
        }
        if (type === 'currency') {
            return `$${value}`;
        }
        if (type === 'date') {
            return new Date(value).toISOString().split('T')[0];
        }
        if (type === 'datetime') {
            return new Date(value).toISOString();
        }
        return value;
    };

    const cellValue = row[columnName as keyof Row];
    const cellValueFormatted = formatCellValue(cellValue, columnType);

    return (
        <div 
            style={cellStyle}
            onMouseEnter={() => onRowHover(rowIndex, true)}
            onMouseLeave={() => onRowHover(rowIndex, false)}
            onClick={() => onRowClick(rowIndex)}
        >
            {cellValueFormatted}
        </div>
    );
};