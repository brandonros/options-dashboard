import React, { useState, useEffect } from 'react'
import { DataTable } from "./components/DataTable";
import { Row } from './types';
import { COLUMNS } from './constants/tableConfig';
import { useTableData } from './hooks/useTableData';
import { dataService } from './services/dataService';
import { exportCsv, exportJson } from './utils/export';
import { TableProvider, useTableContext } from './providers/TableProvider';

const AppContent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [extended, setExtended] = useState(false);
    const [oldestRow, setOldestRow] = useState<Row | null>(null);    
    const { processedRows, setRows, rows } = useTableContext();
    const { loadData } = useTableData(setRows, setIsLoading);

    const STYLES = {
        button: {
            borderRadius: '0',
            WebkitBorderRadius: '0',
            MozBorderRadius: '0',
        }
    };

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
        const start = performance.now();
        setIsLoading(true);
        try {
            await dataService.updateTableData(extended);
            await loadData();
        } catch (err) {
            console.error('Failed to update table data:', err);
        } finally {
            const elapsed = performance.now() - start;
            console.log(`Update completed in ${elapsed.toFixed(2)}ms`);
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'monospace'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: '8px', 
                padding: '12px 0' 
            }}>
                {isLoading && <span>loading...</span>}
                {oldestRow && (
                    <span>Last updated: {new Intl.DateTimeFormat('en-US', {
                        timeZone: 'America/New_York',
                        dateStyle: 'medium',
                        timeStyle: 'short'
                    }).format(new Date(oldestRow.scraped_at))}</span>
                )}
                <br />
                <input style={STYLES.button}
                    type="button" 
                    onClick={handleUpdateClick} 
                    value="update"
                    disabled={isLoading}
                />
                <label>extended: </label>
                <input type="checkbox" onChange={(e) => setExtended(e.target.checked)} />
                <br />
                <input style={STYLES.button} type="button" onClick={() => exportCsv(processedRows)} value="export csv" />
                <input style={STYLES.button} type="button" onClick={() => exportJson(processedRows)} value="export json" />
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
                key: 'daily_simple_roi',
                type: 'percentage',
                direction: 'desc'
            }]}
        >
            <AppContent />
        </TableProvider>
    );
};
