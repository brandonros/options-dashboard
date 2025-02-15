import React, { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableVirtualGrid } from './TableVirtualGrid';
import { useTableScrollSync } from '../../hooks/useTableScrollSync';
import { useTableContext } from '../../providers/TableProvider';

const STYLES = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    summary: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '12px 0',
    },
    gridWrapper: {
        flex: 1,
        minHeight: 0, // Important for proper flex behavior
        position: 'relative' as const,
        height: '100%'
    }
};

interface DataTableProps {
    columns: any[]; // Define proper type for columns
}

export const DataTable: React.FC<DataTableProps> = ({ columns }) => {
    const [hoverRowIndex, setHoverRowIndex] = useState<number>(-1);
    const { gridRef, headerRef, handleGridScroll } = useTableScrollSync();
    const { 
        filters, 
        sorts, 
        processedRows, 
        totalRows,
        setFilters,
        setSorts
    } = useTableContext();

    const handleFilterChange = (key: string, value: string) => {
        setFilters({
            ...filters,
            [key]: value
        });
    };

    const handleSortChange = (columnName: string, type: string) => {
        if (sorts.length === 1 && sorts[0].key === columnName) {
            setSorts([{
                key: columnName,
                direction: sorts[0].direction === 'asc' ? 'desc' : 'asc',
                type
            }]);
        } else {
            setSorts([{
                key: columnName,
                direction: 'asc',
                type
            }]);
        }
    };

    const handleRowHover = (rowIndex: number, isHovered: boolean) => {
        console.log('rowIndex', rowIndex, 'isHovered', isHovered);
        setHoverRowIndex(isHovered ? rowIndex : -1);
    };

    const handleRowClick = (rowIndex: number) => {
        const row = processedRows[rowIndex];
        navigator.clipboard.writeText(JSON.stringify(row, null, 2))
            .then(() => console.log('Row data copied to clipboard'))
            .catch(err => console.error('Failed to copy to clipboard:', err));
    };

    return (
        <div style={STYLES.container}>
            <div style={STYLES.summary}>
                <span>{processedRows.length} / {totalRows} rows</span><br />
            </div>

            <TableHeader
                ref={headerRef}
                columns={columns}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />

            <div style={STYLES.gridWrapper}>
                <TableVirtualGrid
                    ref={gridRef}
                    columns={columns}
                    rows={processedRows}
                    hoverRowIndex={hoverRowIndex}
                    onScroll={handleGridScroll}
                    onRowHover={handleRowHover}
                    onRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};
