import React, { createContext, useContext, useState } from 'react';
import { useTableOperations } from '../hooks/useTableOperations';
import { Filters, Sorts, Rows } from '../types';

// Define the context type
export interface TableContextType {
    rows: Rows;
    filters: Filters;
    sorts: Sorts;
    processedRows: Rows;
    totalRows: number;
    setFilters: (filters: Filters) => void;
    setSorts: (sorts: Sorts) => void;
    setRows: (rows: Rows) => void;
}

// Create context with the correct type
export const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider: React.FC<{
    children: React.ReactNode;
    initialRows?: Rows;
    initialFilters?: Filters;
    initialSorts?: Sorts;
}> = ({ 
    children, 
    initialRows = [],
    initialFilters = {},
    initialSorts = []
}) => {
    const [rows, setRows] = useState<Rows>(initialRows);
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [sorts, setSorts] = useState<Sorts>(initialSorts);
    
    const tableOperations = useTableOperations(rows, filters, sorts);

    const value: TableContextType = {
        rows,
        filters,
        sorts,
        setFilters,
        setSorts,
        setRows,
        processedRows: tableOperations.processedRows,
        totalRows: tableOperations.totalRows
    };

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
};

export const useTableContext = (): TableContextType => {
    const context = useContext(TableContext);
    if (context === undefined) {
        throw new Error('useTableContext must be used within a TableProvider');
    }
    return context;
}; 