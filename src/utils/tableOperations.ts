import { Filters, Sorts, Rows } from '../types';

export const applyFilters = (rows: Rows, filters: Filters) => {
    console.log({
        filters
    })
    return rows.filter(row => {
        return Object.entries(filters).every(([key, value]) => {
            // Skip filtering if the value is an empty string
            if (value === '') return true;

            // Convert the filter value to a RegExp object
            try {
                const regex = new RegExp(value);
                const fieldValue = String(row[key as keyof typeof row]);
                return regex.test(fieldValue);
            } catch (error) {
                console.warn(`Invalid regex pattern for ${key}: ${value}`, error);
                return false;
            }
        });
    });
};

export const applySorts = (rows: Rows, sorts: Sorts) => {
    const result = [...rows].sort((a, b) => {
        // Loop through each sort criteria
        for (const sort of sorts) {
            const multiplier = sort.direction === 'asc' ? 1 : -1;
            const isNumeric = sort.type === 'number' || sort.type === 'percentage' || sort.type === 'currency';
            const aValue = isNumeric ? Number(a[sort.key as keyof typeof a]) : a[sort.key as keyof typeof a];
            const bValue = isNumeric ? Number(b[sort.key as keyof typeof b]) : b[sort.key as keyof typeof b];
            
            if (aValue < bValue) return -1 * multiplier;
            if (aValue > bValue) return 1 * multiplier;
            // If values are equal, continue to next sort criteria
        }
        return 0;
    });

    // Add assertion for numeric sorts
    if (sorts.length > 0) {
        const firstSort = sorts[0];
        if (firstSort.type === 'number' || firstSort.type === 'percentage' || firstSort.type === 'currency') {
            const key = firstSort.key as keyof typeof result[0];
            const values = result.map(row => Number(row[key]));
            const maxValue = Math.max(...values);
            
            if (firstSort.direction === 'desc' && Number(result[0][key]) !== maxValue) {
                console.error('Sorting failed! First row:', result[0]);
                console.error('Max value found:', maxValue);
                console.error('All values:', values);
                throw new Error(`Sorting assertion failed: Expected ${maxValue} to be first when sorting ${key} in descending order`);
            }
        }
    }

    return result;
}; 