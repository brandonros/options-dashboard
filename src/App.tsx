import React, { useState, useEffect } from 'react'
import { DataTable } from "./components/DataTable";
import { Row } from './types';
import { COLUMNS } from './constants/tableConfig';
import { useTableData } from './hooks/useTableData';
import { dataService } from './services/dataService';
import { exportCsv, exportJson } from './utils/export';
import { TableProvider, useTableContext } from './providers/TableProvider';
import { SYMBOLS } from './constants/symbols';

const AppContent = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [oldestRow, setOldestRow] = useState<Row | null>(null);    
    const { processedRows, setRows, rows } = useTableContext();
    const { loadData } = useTableData(setRows);

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

    const handleUpdateClick = async () => {
        setIsUpdating(true);
        try {
            await dataService.updateTableData(SYMBOLS);
            await loadData();
        } catch (err) {
            console.error('Failed to update table data:', err);
        } finally {
            setIsUpdating(false);
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
                    <span>Last updated: {new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/New_York',
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    }).format(new Date(oldestRow.scraped_at))}</span>
                )}
                <input 
                    type="button" 
                    onClick={handleUpdateClick} 
                    value={isUpdating ? "updating..." : "update"}
                    disabled={isUpdating}
                />
                <input type="button" onClick={() => exportCsv(processedRows)} value="export csv" />
                <input type="button" onClick={() => exportJson(processedRows)} value="export json" />
            </div>

            <div style={{ flex: 1, minHeight: 0, paddingBottom: '20px' }}>
                <DataTable
                    columns={COLUMNS}
                />
            </div>
        </div>
    );
};

export default () => {
    return (
        <TableProvider
            initialSorts={[{
                key: 'daily_secured_ror',
                type: 'percentage',
                direction: 'desc'
            }]}
        >
            <AppContent />
        </TableProvider>
    );
};
