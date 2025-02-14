import React, { createContext, useContext } from 'react';
import { Rows } from '../types';

interface TableContextType {
  processedRows: Rows;
  totalRows: number;
}

export const TableContext = createContext<TableContextType>({ processedRows: [], totalRows: 0 });

export const useTableContext = () => useContext(TableContext); 