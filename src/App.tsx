import React, { useState } from 'react'
import { DataTable } from "./components/DataTable";
import { Filters, Sorts, Rows } from './types';
import { COLUMNS } from './constants/tableConfig';
import { useTableData } from './hooks/useTableData';

export default () => {
    const [filters, setFilters] = useState<Filters>({});
    const [sorts, setSorts] = useState<Sorts>([
        {
            key: 'secured_ror',
            type: 'percentage',
            direction: 'desc'
        }
    ]);
    const [rows, setRows] = useState<Rows>([]);

    useTableData(setRows);

    return (
        <div style={{ height: '100%' }}>
            <DataTable
                filters={ filters }
                sorts={ sorts }
                columns={ COLUMNS }
                rows={ rows }
                setFilters={ setFilters }
                setSorts={ setSorts }
            />
        </div>
    );
};
