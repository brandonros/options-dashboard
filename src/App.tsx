import React, { useState, useEffect, useRef, useCallback } from 'react'
import { DataTable } from "./components/DataTable";
import { Row } from './types';
import { COLUMNS } from './constants/tableConfig';
import { dataService } from './services/dataService';
import { exportCsv, exportJson } from './utils/export';
import { TableProvider, useTableContext } from './providers/TableProvider';

const AppContent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [extended, setExtended] = useState(false);
    const [risky, setRisky] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [oldestRow, setOldestRow] = useState<Row | null>(null);    
    const [pageLoadTime, _setPageLoadTime] = useState<Date>(new Date());
    const { processedRows, setRows, rows } = useTableContext();
    const intervalRef = useRef<number | null>(null);
    const [isControlsVisible, setIsControlsVisible] = useState(false);

    const STYLES = {
        button: {
            borderRadius: '0',
            WebkitBorderRadius: '0',
            MozBorderRadius: '0',
        },
        controlContainer: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '8px',
            padding: '12px 8px',
            alignItems: 'flex-end' as const,
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
        },
        row: {
            display: 'flex',
            alignItems: 'center' as const,
            gap: '8px',
        },
        toggleButton: {
            position: 'fixed' as const,
            top: '50%',
            right: '0',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            padding: '8px 4px',
            cursor: 'pointer',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            borderRight: 'none',
        }
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            const filtered = risky ? false : true;
            const rows = await dataService.fetchTableData(filtered);
            setRows(rows);
        } catch (err) {
            console.error('Failed to load table data:', err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUpdateClick = async () => {
        // Check if more than 5 minutes have elapsed since page load
        const minutesSinceLoad = (Date.now() - pageLoadTime.getTime()) / (1000 * 60);
        if (minutesSinceLoad > 5) {
            console.log('Page has been loaded for over 5 minutes. Please refresh the page to update.');
            return;
        }

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

    useEffect(() => {
        loadData();
    }, [risky]);

    useEffect(() => {
        // autorefresh off but interval exists, clear it
        if (!autoRefresh && intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // autorefresh on and interval doesn't exist, create it
        if (autoRefresh && !intervalRef.current) {
            intervalRef.current = window.setInterval(async () => {
                if (!isLoading) {
                    try {
                        await handleUpdateClick();
                    } catch (err) {
                        console.error('Failed to update table data:', err);
                    }
                } else {
                    console.log('skipping update because loading');
                }
            }, 30000);
        }

        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [autoRefresh]);

    return (
        <div style={{ 
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'monospace'
        }}>
            <button 
                onClick={() => setIsControlsVisible(!isControlsVisible)}
                style={STYLES.toggleButton}
            >
                {isControlsVisible ? '▼' : '▲'}
            </button>

            {isControlsVisible && (
                <div className="control-container" style={STYLES.controlContainer}>
                    {/* loading row */}
                    <div style={STYLES.row}>
                        {isLoading ? <span>loading...</span> : <span>loaded</span>}
                    </div>

                    {/* page loaded row */}
                    <div style={STYLES.row}>
                        <span>Page loaded: {new Intl.DateTimeFormat('en-US', {
                            timeZone: 'America/New_York',
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }).format(pageLoadTime)}</span>
                    </div>

                    {/* last updated row */}
                    <div style={STYLES.row}>
                        <span>Last updated: {oldestRow && new Intl.DateTimeFormat('en-US', {
                            timeZone: 'America/New_York',
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        }).format(new Date(oldestRow.scraped_at))}</span>
                    </div>
                    
                    {/* Update and extended checkbox row */}
                    <div style={STYLES.row}>
                        <input 
                            style={STYLES.button}
                            type="button" 
                            onClick={handleUpdateClick} 
                            value="update"
                            disabled={isLoading}
                        />
                        <label>
                            extended: 
                            <input 
                                type="checkbox" 
                                onChange={(e) => setExtended(e.target.checked)} 
                                style={{ marginLeft: '4px' }}
                            />
                        </label>
                    </div>

                    {/* auto refresh + risky row */}
                     <div style={STYLES.row}>
                        <label>
                            auto refresh: 
                            <input 
                                type="checkbox" 
                                checked={autoRefresh}
                                onChange={(e) => setAutoRefresh(e.target.checked)} 
                                style={{ marginLeft: '4px' }}
                            />
                        </label>
                        <label>
                            risky: 
                            <input 
                                type="checkbox" 
                                checked={risky}
                                onChange={(e) => setRisky(e.target.checked)} 
                                style={{ marginLeft: '4px' }}
                            />
                        </label>
                    </div>
                    
                    {/* Export buttons row */}
                    <div style={STYLES.row}>
                        <input 
                            style={STYLES.button} 
                            type="button" 
                            onClick={() => exportCsv(processedRows)} 
                            value="export csv" 
                        />
                        <input 
                            style={STYLES.button} 
                            type="button" 
                            onClick={() => exportJson(processedRows)} 
                            value="export json" 
                        />
                    </div>
                </div>
            )}

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