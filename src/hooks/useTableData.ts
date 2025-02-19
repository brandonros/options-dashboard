import { useEffect, useCallback } from 'react';
import { dataService } from '../services/dataService';
import { Rows } from '../types';

export const useTableData = (setRows: (rows: Rows) => void) => {
    const loadData = useCallback(async () => {
        try {
            const rows = await dataService.fetchTableData();
            setRows(rows);
        } catch (error) {
            console.error('Failed to fetch table data:', error);
            // Consider setting an error state here to show to the user
        }
    }, [setRows]);

    // Initial load
    useEffect(() => {
        loadData();

        return () => {
            setRows([]);
        };
    }, [loadData]);

    return { loadData };
}; 