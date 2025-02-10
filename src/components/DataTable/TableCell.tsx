import React from 'react';
import { TableCellProps, Row } from '../../types';

export const TableCell = ({
    columnIndex,
    rowIndex,
    style,
    columns,
    rows
}: TableCellProps) => {
    const columnName = columns[columnIndex].name;
    const columnType = columns[columnIndex].type;
    const row = rows[rowIndex];
    
    const cellStyle = {
        ...style,
        borderRight: '1px solid black',
        borderBottom: '1px solid black',
        borderLeft: columnIndex === 0 ? '1px solid black' : 'none', // left most cell
    };

    const cellValue = row[columnName as keyof Row];
    const cellValueFormatted = columnType === 'percentage' ? `${cellValue}%` : columnType === 'currency' ? `$${cellValue}` : cellValue;

    return (
        <div style={cellStyle}>
            {cellValueFormatted}
        </div>
    );
};