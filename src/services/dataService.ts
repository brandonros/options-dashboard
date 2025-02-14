import { Row, Rows } from "../types";
import { parseCsv } from "../utils/csvParser";

export const dataService = {
    async refreshTableData(): Promise<void> {
        const symbols = [
             'AAPL', 'AMD', 'AMZN', 'BABA', 'GOOGL', 'MSFT',
             'NFLX', 'NVDA', 'PLTR', 'SPY', 'TSLA', 'UBER'
        ];

        for (const symbol of symbols) {
            const response = await fetch('/api/rpc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'scrape',
                    params: {
                        symbol: symbol,
                        distanceDays: 60,
                        moneynessDistance: 0.25
                    },
                    id: crypto.randomUUID()
                })
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }
            console.log(data);
        }
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
                id: 1
            })
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
        return parseCsv<Row>(data.result);
    },

    async purgeTableData(): Promise<void> {
        const response = await fetch('/api/rpc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'purge',
                params: {},
                id: 1
            })
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error.message);
        }
    }
};
