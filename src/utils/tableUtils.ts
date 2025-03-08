import { Column, Sorts } from "../types";

export const getSortIndicator = (sorts: Sorts, columnName: string) => {
    const sort = sorts.find(sort => sort.key === columnName);
    if (sort) {
        return sort.direction === 'asc' ? '↑' : '↓';
    }
    return '';
}

export const calculateColumnWidth = (sorts: Sorts, column: Column) => {
    const sort = sorts.find(sort => sort.key === column.name);
    const extraSortWidth = sort ? 20 : 0;
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
    if (column.name === 'daily_simple_roi') {
        return 100;
    }
    if (column.name === 'scraped_at') {
        return 250;
    }
    const name = column.alias ? column.alias : column.name;
    if (name.length <= 6) {
        return 80 + extraSortWidth;
    }
    return name.length * 10 + extraSortWidth;
}
