import React, { useState, useEffect } from 'react';
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

interface PopupState {
    rowIndex: number;
    isVisible: boolean;
    x: number;
    y: number;
}

export const DataTable: React.FC<DataTableProps> = ({ columns }) => {
    const [hoverRowIndex, setHoverRowIndex] = useState<number>(-1);
    const [popup, setPopup] = useState<PopupState>({ rowIndex: -1, isVisible: false, x: 0, y: 0 });
    const { gridRef, headerRef, handleGridScroll } = useTableScrollSync();
    const { 
        filters, 
        sorts, 
        processedRows, 
        totalRows,
        setFilters,
        setSorts
    } = useTableContext();

    // workaround column width changes?
    useEffect(() => {
        if (gridRef.current) {
            gridRef.current.resetAfterColumnIndex(0, true);
        }
    }, [filters, sorts, processedRows, totalRows]);

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
        setHoverRowIndex(isHovered ? rowIndex : -1);
    };

    const handleRowClick = async (rowIndex: number, event: React.MouseEvent) => {
        setPopup({
            rowIndex,
            isVisible: popup.rowIndex !== rowIndex || !popup.isVisible,
            x: event.clientX,
            y: event.clientY
        });
        const row = processedRows[rowIndex];
        try {
            await navigator.clipboard.writeText(JSON.stringify(row, null, 2));
            console.log('Row data copied to clipboard');
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

    return (
        <div className="table-container" style={STYLES.container}>
            <div className="table-summary" style={STYLES.summary}>
                <span>{processedRows.length} / {totalRows} rows</span><br />
            </div>

            <TableHeader
                ref={headerRef}
                columns={columns}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
            />

            <div className="table-grid-wrapper" style={STYLES.gridWrapper}>
                <TableVirtualGrid
                    ref={gridRef}
                    columns={columns}
                    rows={processedRows}
                    sorts={sorts}
                    hoverRowIndex={hoverRowIndex}
                    onScroll={handleGridScroll}
                    onRowHover={handleRowHover}
                    onRowClick={handleRowClick}
                />
                {popup.isVisible && (
                    <div className="table-popup" style={{
                        position: 'fixed',
                        left: popup.x,
                        top: popup.y + 20, // Offset to show below cursor
                        backgroundColor: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                    }}>
                        <pre>
                            {JSON.stringify(processedRows[popup.rowIndex], null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
