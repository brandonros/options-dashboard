import { GridOnScrollProps } from "react-window";

// Sort types
export type SortDirection = 'asc' | 'desc';

export interface Sort {
    key: string;
    type: string;
    direction: SortDirection;
}

export type Sorts = Sort[];

// Column types
export interface Column {
    name: string;
    width: number;
    type: string;
}

export type Columns = Column[];

// Row types
export interface Row {
    symbol: string
    scraped_at: string
    expiration_date: string
    last_trade_price: string
    instrument_type: string
    strike_price: string
    implied_volatility: string
    delta: string
    gamma: string
    theta: string
    vega: string
    rho: string
    volume: string
    open_interest: string
    bid_price: string
    ask_price: string
    mark_price: string
    secured_ror: string
    naked_ror: string
    moneyness_distance: string
    days_to_expiration: string
    prob_itm_at_expiration: string
}

export type Rows = Row[];

// Filter types
export type Filters = Record<string, string>;

// Table component props
export type TableProps = {
    filters: Filters,
    sorts: Sorts,
    columns: Columns,
    rows: Rows,
    setFilters: (filters: Filters) => void,
    setSorts: (sorts: Sorts) => void
}

export type TableCellProps = {
    columnIndex: number,
    rowIndex: number,
    style: React.CSSProperties,
    columns: Columns,
    rows: Rows,
    hoverRowIndex: number,
    onRowHover: (rowIndex: number, isHovered: boolean) => void,
    onRowClick: (rowIndex: number) => void
}

export type TableHeaderProps = {
    columns: Columns,
    filters: Filters,
    sorts: Sorts,
    onFilterChange: (name: string, value: string) => void,
    onSortChange: (columnName: string, type: string) => void
}

export type TableVirtualGridProps = {
    columns: Columns,
    rows: Rows,
    hoverRowIndex: number,
    onScroll: (event: GridOnScrollProps) => void,
    onRowHover: (rowIndex: number, isHovered: boolean) => void,
    onRowClick: (rowIndex: number) => void
}