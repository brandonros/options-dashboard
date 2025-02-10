import { Filters, Sorts, Rows } from '../types';

export const applyFilters = (rows: Rows, filters: Filters) => {
    return rows.filter(row => {
        return Object.entries(filters).every(([key, value]) => {
            // Skip filtering if the value is an empty string
            if (value === '') return true;
            return row[key as keyof typeof row] === value;
        });
    });
};

export const applySorts = (rows: Rows, sorts: Sorts) => {
    return [...rows].sort((a, b) => {
        return sorts.reduce((acc, sort) => {
            const multiplier = sort.direction === 'asc' ? 1 : -1;
            const isNumeric = sort.type === 'number' || sort.type === 'percentage' || sort.type === 'currency';
            const aValue = isNumeric ? Number(a[sort.key as keyof typeof a]) : a[sort.key as keyof typeof a];
            const bValue = isNumeric ? Number(b[sort.key as keyof typeof b]) : b[sort.key as keyof typeof b];
            if (aValue < bValue) {
                return -1 * multiplier;
            } else if (aValue > bValue) {
                return 1 * multiplier;
            }
            return 0;
        }, 0);
    });
}; 