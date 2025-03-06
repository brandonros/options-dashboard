import React from 'react';
import { TableCellProps, Row } from '../../types';

const getBackgroundColor = (row: Row, hoverIndex: number, rowIndex: number) => {
    // Return hover color if row is being hovered
    if (rowIndex === hoverIndex) return '#ffeb3b';

    // ITM Call (strike below market) - cool blue
    if (row.instrument_type === 'call' && row.strike_price < row.underlying_last_trade_price) {
        return 'rgba(0, 105, 255, 0.15)'; // Medium blue
    }

    // OTM Call (strike above market) - light green
    if (row.instrument_type === 'call' && row.strike_price > row.underlying_last_trade_price) {
        return 'rgba(76, 175, 80, 0.15)'; // Material design green
    }

    // ITM Put (strike above market) - deep purple
    if (row.instrument_type === 'put' && row.strike_price > row.underlying_last_trade_price) {
        return 'rgba(103, 58, 183, 0.15)'; // Material design deep purple
    }

    // OTM Put (strike below market) - amber/orange
    if (row.instrument_type === 'put' && row.strike_price < row.underlying_last_trade_price) {
        return 'rgba(255, 152, 0, 0.15)'; // Material design amber
    }
};

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
        backgroundColor: getBackgroundColor(row, rowIndex, hoverRowIndex),
        cursor: 'pointer',
        padding: `1px`,
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
            onClick={(event) => onRowClick(rowIndex, event)}
        >
            {cellValueFormatted}
        </div>
    );
};