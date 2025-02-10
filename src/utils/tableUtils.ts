import { Sorts } from "../types";

export const getSortIndicator = (sorts: Sorts, columnName: string) => {
    const sort = sorts.find(sort => sort.key === columnName);
    if (sort) {
        return sort.direction === 'asc' ? '↑' : '↓';
    }
    return '';
}