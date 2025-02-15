import React, { forwardRef } from 'react';
import { useTableContext } from '../../providers/TableProvider';
import { calculateColumnWidth, getSortIndicator } from '../../utils/tableUtils';

const STYLES = {
    container: {
        overflowX: 'scroll' as const,
    },
    row: {
        display: 'flex',
        flexDirection: 'row' as const,
    },
    headerCell: {
        cursor: 'pointer',
        textAlign: 'center' as const,
        fontWeight: 'bold',
        flexGrow: 0,
        flexShrink: 0,
    },
    filterCell: {
        textAlign: 'center' as const,
        flexGrow: 0,
        flexShrink: 0,
    },
    filterInput: {
        boxSizing: 'border-box' as const,
        border: '1px solid black',
        padding: '4px 6px',
        margin: 0,
        width: '100%',
        borderRadius: '0',
        WebkitBorderRadius: '0',
        MozBorderRadius: '0',
    }
};

interface TableHeaderProps {
    columns: any[];
    onFilterChange: (key: string, value: string) => void;
    onSortChange: (columnName: string, type: string) => void;
}

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(({ 
    columns,
    onFilterChange,
    onSortChange
}, ref) => {
    const { filters, sorts } = useTableContext();

    return (
        <div ref={ref} style={STYLES.container}>
            <div style={STYLES.row}>
                {columns.map((column) => (
                    <div
                        key={`header-${column.name}`}
                        style={{ ...STYLES.headerCell, flexBasis: calculateColumnWidth(column) }}
                        onClick={() => onSortChange(column.name, column.type)}
                    >
                        {column.name} {getSortIndicator(sorts, column.name)}
                    </div>
                ))}
            </div>
            <div style={STYLES.row}>
                {columns.map((column) => (
                    <div 
                        key={`filter-${column.name}`} 
                        style={{ ...STYLES.filterCell, flexBasis: calculateColumnWidth(column) }}
                    >
                        <input
                            type="text"
                            value={filters[column.name] || ''}
                            onChange={(e) => onFilterChange(column.name, e.target.value)}
                            style={STYLES.filterInput}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
