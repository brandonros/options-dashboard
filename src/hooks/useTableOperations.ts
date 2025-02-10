import { useState, useEffect } from 'react';
import { Rows, Filters, Sorts } from '../types';
import { applyFilters, applySorts } from '../utils/tableOperations';

export const useTableOperations = (rows: Rows, filters: Filters, sorts: Sorts) => {
    const [processedRows, setProcessedRows] = useState<Rows>([]);
    const [totalRows, setTotalRows] = useState<number>(0);

    useEffect(() => {
        const filtered = applyFilters(rows, filters);
        const sortedAndFiltered = applySorts(filtered, sorts);
        setTotalRows(rows.length);
        setProcessedRows(sortedAndFiltered);
    }, [rows, filters, sorts]);

    return {
        processedRows,
        totalRows,
    };
}; 