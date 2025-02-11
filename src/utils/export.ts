import { Row } from "../types"

export const downloadFile = (blob: Blob, fileName: string) => {
    // create blob
    const url = window.URL.createObjectURL(blob)
    // create link
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    // add to dom
    document.body.appendChild(a)
    // click
    a.click()
    // clean up
    a.remove()
}

export const exportCsv = (filteredRows: Row[]) => {
    if (filteredRows.length === 0) {
        return
    }
    const firstRow = filteredRows[0]
    const keys = Object.keys(firstRow)
    const output = []
    output.push(keys.map(key => `"${key}"`).join(','))
    for (const filteredRow of filteredRows) {
        const values = []
        for (const key of keys) {
            values.push(`"${filteredRow[key as keyof Row]}"`)
        }
        output.push(values.join(','))
    }
    const stringifiedOutput = output.join('\n')
    const blob = new Blob([stringifiedOutput], { type: 'text/csv' });
    downloadFile(blob, 'output.csv')
}

export const exportJson = (filteredRows: Row[]) => {
    if (filteredRows.length === 0) {
        return
    }
    const stringifiedOutput = JSON.stringify(filteredRows, undefined, 2)
    const blob = new Blob([stringifiedOutput], { type: 'application/json' });
    downloadFile(blob, 'output.json')
}
