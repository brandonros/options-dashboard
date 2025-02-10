import { useEffect } from 'react';
import { dataService } from '../services/dataService';
import { Rows } from '../types';

export const useTableData = (setRows: (rows: Rows) => void) => {
    useEffect(() => {
        const loadData = async () => {
            try {
                const rows = await dataService.fetchTableData();
                setRows(rows);
            } catch (error) {
                console.error('Failed to fetch table data:', error);
                // Consider setting an error state here to show to the user
            }
        };

        loadData();

        return () => {
            setRows([]);
        };
    }, [setRows]);
}; 