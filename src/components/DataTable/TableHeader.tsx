import React, { forwardRef } from 'react';
import { TableHeaderProps } from '../../types';
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
    }
};

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(({
    columns,
    filters,
    sorts,
    onFilterChange,
    onSortChange
}, ref) => {
    return (
        <div ref={ref} style={STYLES.container}>
            <div style={STYLES.row}>
                {columns.map(({ name, width, type }) => (
                    <div
                        key={`header-${name}`}
                        style={{ ...STYLES.headerCell, flexBasis: width }}
                        onClick={() => onSortChange(name, type)}
                    >
                        {name} {getSortIndicator(sorts, name)}
                    </div>
                ))}
            </div>
            <div style={STYLES.row}>
                {columns.map(({ name, width }) => (
                    <div 
                        key={`filter-${name}`} 
                        style={{ ...STYLES.filterCell, flexBasis: width }}
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
