import React, { useState } from 'react'
import { DataTable } from "./components/DataTable";
import { Filters, Sorts, Rows } from './types';
import { COLUMNS } from './constants/tableConfig';
import { useTableData } from './hooks/useTableData';
import { dataService } from './services/dataService';
import { exportCsv, exportJson } from './utils/export';
import { useTableContext } from './context/TableContext';

export default () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isPurging, setIsPurging] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    const [sorts, setSorts] = useState<Sorts>([
        {
            key: 'secured_ror',
            type: 'percentage',
            direction: 'desc'
        }
    ]);
    const [rows, setRows] = useState<Rows>([]);
    const { processedRows } = useTableContext();
    const { refreshData } = useTableData(setRows);

    const handleRefreshClick = async () => {
        setIsRefreshing(true);
        try {
            await dataService.refreshTableData();
            await refreshData();
        } catch (err) {
            console.error('Failed to refresh table data:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handlePurgeClick = async () => {
        setIsPurging(true);
        try {
            await dataService.purgeTableData();
            await refreshData();
        } catch (err) {
            console.error('Failed to purge table data:', err);
        } finally {
            setIsPurging(false);
        }
    };

    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '12px 0' }}>
                <input 
                    type="button" 
                    onClick={handlePurgeClick} 
                    value={isPurging ? "purging..." : "purge"}
                    disabled={isPurging}
                />
                <input 
                    type="button" 
                    onClick={handleRefreshClick} 
                    value={isRefreshing ? "refreshing..." : "refresh"}
                    disabled={isRefreshing}
                />
                <input type="button" onClick={() => exportCsv(processedRows)} value="export csv" />
                <input type="button" onClick={() => exportJson(processedRows)} value="export json" />
            </div>

            <DataTable
                filters={filters}
                sorts={sorts}
                columns={COLUMNS}
                rows={rows}
                setFilters={setFilters}
                setSorts={setSorts}
            />
        </div>
    );
};
