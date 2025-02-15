import React, { forwardRef } from 'react';
import { useTableContext } from '../../providers/TableProvider';
import { getSortIndicator } from '../../utils/tableUtils';

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
                {columns.map(({ name, type }) => (
                    <div
                        key={`header-${name}`}
                        style={{ ...STYLES.headerCell, flexBasis: name.length * 10 }}
                        onClick={() => onSortChange(name, type)}
                    >
                        {name} {getSortIndicator(sorts, name)}
                    </div>
                ))}
            </div>
            <div style={STYLES.row}>
                {columns.map(({ name }) => (
                    <div 
                        key={`filter-${name}`} 
                        style={{ ...STYLES.filterCell, flexBasis: name.length * 10 }}
                    >
                        <input
                            type="text"
                            value={filters[name] || ''}
                            onChange={(e) => onFilterChange(name, e.target.value)}
                            style={STYLES.filterInput}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});
