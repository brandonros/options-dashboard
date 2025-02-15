import React, { useState, useEffect } from 'react'
import { DataTable } from "./components/DataTable";
import { Filters, Sorts, Rows, Row } from './types';
import { COLUMNS } from './constants/tableConfig';
import { useTableData } from './hooks/useTableData';
import { dataService } from './services/dataService';
import { exportCsv, exportJson } from './utils/export';
import { useTableContext } from './context/TableContext';

export default () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [oldestRow, setOldestRow] = useState<Row | null>(null);    
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

    useEffect(() => {
        if (rows.length > 0) {
            const oldest = rows.reduce((oldest, current) => {
                return new Date(oldest.scraped_at) <= new Date(current.scraped_at) 
                    ? oldest 
                    : current;
            });
            setOldestRow(oldest);
        } else {
            setOldestRow(null);
        }
    }, [rows]);

    const handleRefreshClick = async () => {
        setIsRefreshing(true);
        try {
            await dataService.purgeTableData();
            await dataService.refreshTableData();
            await refreshData();
        } catch (err) {
            console.error('Failed to refresh table data:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <div style={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: '8px', 
                padding: '12px 0' 
            }}>
                {oldestRow && (
                    <span>Last updated: {oldestRow.scraped_at}</span>
                )}
                <input 
                    type="button" 
                    onClick={handleRefreshClick} 
                    value={isRefreshing ? "refreshing..." : "refresh"}
                    disabled={isRefreshing}
                />
                <input type="button" onClick={() => exportCsv(processedRows)} value="export csv" />
                <input type="button" onClick={() => exportJson(processedRows)} value="export json" />
            </div>

            <div style={{ flex: 1, minHeight: 0, paddingBottom: '20px' }}>
                <DataTable
                    filters={filters}
                    sorts={sorts}
                    columns={COLUMNS}
                    rows={rows}
                    setFilters={setFilters}
                    setSorts={setSorts}
                />
            </div>
        </div>
    );
};
