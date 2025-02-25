import { Row } from "../types";

export const parseCsv = <T>(data: string): T[] => {
    // Split into rows by newline and filter out empty lines
    const rows = data.split('\n')
        .filter(row => row.trim().length > 0);

    if (rows.length === 0) {
        return []
    }
    
    // Get headers from first row and clean them
    const headers = rows[0].split(',').map(header => header.trim());
    
    // Convert remaining rows into objects
    const result = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        const obj: { [key: string]: string } = {};
        
        headers.forEach((header, index) => {
            obj[header] = values[index] || ''; // Use empty string for missing values
        });
        
        return obj as unknown as T;
    });
    
    return result;
}
