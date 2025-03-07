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
    type: string;
}

export type Columns = Column[];

// Row types
export interface Row {
    scraped_at: string
    symbol: string
    instrument_type: string
    expiration_date: string
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
    last_trade_price: string
    bid_ask_spread: string
    slippage_impact: string
    underlying_last_trade_price: string
    secured_ror: string
    naked_ror: string
    moneyness_distance: string
    moneyness: string
    prob_itm_at_expiration: string
    days_to_expiration: string
    capital_commitment_period: string
    premium_underlying_ratio: string
    volume_open_interest_ratio: string
    premium_iv_ratio: string
    theta_premium_ratio: string
    time_value_ratio: string
    break_even: string
    intrinsic_value: string
    extrinsic_value: string
    moneyness_ratio: string
    theta_efficiency: string
    distance_to_breakeven: string
    premium_to_breakeven: string
    daily_secured_ror: string
    daily_secured_ror_per_iv: string
    daily_secured_ror_per_implied_move: string
    daily_secured_ror_per_delta: string
    implied_move_percent: string
    implied_move_dollars: string
    margin_of_safety: string
    margin_of_safety_percentage: string
    adjusted_margin_of_safety_percentage: string
    simple_roi: string
    daily_simple_roi: string
    risk_adjusted_daily_simple_roi: string
    annualized_simple_roi: string
    volatility_prob_itm_ratio: string
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
    onRowClick: (rowIndex: number, event: React.MouseEvent) => void
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
    onRowClick: (rowIndex: number, event: React.MouseEvent) => void
}