import React, { useState, useEffect } from 'react';
import { TableHeader } from './TableHeader';
import { TableVirtualGrid } from './TableVirtualGrid';
import { useTableScrollSync } from '../../hooks/useTableScrollSync';
import { useTableOperations } from '../../hooks/useTableOperations';
import { TableProps } from '../../types';
import { exportCsv, exportJson } from '../../utils/export';

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
    }
};

export const DataTable = ({ 
    filters,
    sorts,
    columns,
    rows,
    setFilters,
    setSorts 
}: TableProps) => {
    const { gridRef, headerRef, handleGridScroll } = useTableScrollSync();
    const { processedRows, totalRows } = useTableOperations(rows, filters, sorts);

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

    return (
        <div style={STYLES.container}>
            <div style={STYLES.summary}>
                <span>{processedRows.length} / {totalRows} rows</span><br />
                <input type="button" onClick={() => exportCsv(processedRows)} value="export csv" />
                <input type="button" onClick={() => exportJson(processedRows)} value="export json" />
            </div>

            <TableHeader
                ref={headerRef}
                columns={columns}
                filters={filters}
                sorts={sorts}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />

            <div style={STYLES.gridWrapper}>
                <TableVirtualGrid
                    ref={gridRef}
                    columns={columns}
                    rows={processedRows}
                    onScroll={handleGridScroll}
                />
            </div>
        </div>
    );
};
