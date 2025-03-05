import { useEffect, useCallback } from 'react';
import { dataService } from '../services/dataService';
import { Rows } from '../types';

export const useTableData = (setRows: (rows: Rows) => void, setIsLoading: (isLoading: boolean) => void) => {
    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);
            const rows = await dataService.fetchTableData();
            setRows(rows);
        } catch (error) {
            console.error('Failed to fetch table data:', error);
            // Consider setting an error state here to show to the user
        } finally {
            setIsLoading(false);
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