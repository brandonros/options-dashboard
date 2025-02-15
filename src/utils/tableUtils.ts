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
        return 50;
    }
    if (column.name === 'gamma') {
        return 50;
    }
    if (column.name === 'theta') {
        return 50;
    }
    if (column.name === 'vega') {
        return 50;
    }
    if (column.name === 'rho') {
        return 50;
    }
    return column.name.length * 10;
}