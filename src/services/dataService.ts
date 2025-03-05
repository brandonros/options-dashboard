import { v4 as uuidv4 } from 'uuid';
import { Row, Rows } from "../types";
import { parseCsv } from "../utils/csvParser";

export const dataService = {
    async updateTableData(extended: boolean): Promise<void> {
        const response = await fetch('/api/rpc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'scrape',
                params: {
                    distanceDays: 15,
                    moneynessDistance: 0.25,
                    extended
                },
                id: uuidv4()
            })
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        console.log(data);
    },

    async fetchTableData(): Promise<Rows> {
        const response = await fetch('/api/rpc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'dump',
                params: {},
                id: uuidv4()
            })
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return parseCsv<Row>(data.result);
    },
};
