import { Rows } from "../types";
import { parseCsv } from "../utils/csvParser";

export const dataService = {
    async fetchTableData(): Promise<Rows> {
        const response = await fetch('assets/scrape_results.csv');
        const data = await response.text();
        return parseCsv(data);
    }
};
