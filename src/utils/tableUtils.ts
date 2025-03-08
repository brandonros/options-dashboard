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
        return 80;
    }
    if (column.name === 'gamma') {
        return 80;
    }
    if (column.name === 'theta') {
        return 80;
    }
    if (column.name === 'vega') {
        return 80;
    }
    if (column.name === 'rho') {
        return 80;
    }
    if (column.name === 'volume') {
        return 80;
    }
    if (column.name === 'expiration_date') {
        return 100;
    }
    const name = column.alias ? column.alias : column.name;
    if (name.length <= 6) {
        return 80;
    }
    return name.length * 10;
}