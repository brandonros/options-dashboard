import { Column, Sorts } from "../types";

export const getSortIndicator = (sorts: Sorts, columnName: string) => {
    const sort = sorts.find(sort => sort.key === columnName);
    if (sort) {
        return sort.direction === 'asc' ? '↑' : '↓';
    }
    return '';
}

export const calculateColumnWidth = (column: Column) => {
    if (column.name === 'delta') {
        return 75;
    }
    if (column.name === 'gamma') {
        return 75;
    }
    if (column.name === 'theta') {
        return 75;
    }
    if (column.name === 'vega') {
        return 75;
    }
    if (column.name === 'rho') {
        return 75;
    }
    return column.name.length * 10;
}