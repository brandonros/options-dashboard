export const COLUMNS =[
    { name: 'symbol', width: 100, type: 'string' },
    { name: 'underlying_last_trade_price', width: 200, type: 'currency' },

    { name: 'instrument_type', width: 125, type: 'string' },
    { name: 'expiration_date', width: 125, type: 'date' },
    { name: 'strike_price', width: 100, type: 'currency' },

    { name: 'scraped_at', width: 250, type: 'datetime' },
    { name: 'secured_ror', width: 100, type: 'percentage' },
    { name: 'naked_ror', width: 100, type: 'percentage' },
    { name: 'prob_itm_at_expiration', width: 200, type: 'percentage' },
    { name: 'bid_price', width: 100, type: 'currency' },
    { name: 'ask_price', width: 100, type: 'currency' },
    { name: 'mark_price', width: 100, type: 'currency' },

    { name: 'implied_volatility', width: 150, type: 'percentage' },
    { name: 'delta', width: 100, type: 'number' },
    { name: 'gamma', width: 100, type: 'number' },
    { name: 'theta', width: 100, type: 'number' },
    { name: 'vega', width: 100, type: 'number' },
    { name: 'rho', width: 100, type: 'number' },

    { name: 'volume', width: 100, type: 'number' },
    { name: 'open_interest', width: 100, type: 'number' },
    { name: 'volume_open_interest_ratio', width: 200, type: 'percentage' },

    { name: 'bid_ask_spread', width: 150, type: 'currency' },
    { name: 'slippage_impact', width: 150, type: 'percentage' },

    { name: 'intrinsic_value', width: 200, type: 'currency' },
    { name: 'extrinsic_value', width: 200, type: 'currency' },

    { name: 'break_even', width: 200, type: 'currency' },
    { name: 'distance_to_breakeven', width: 200, type: 'currency' },

    { name: 'moneyness_distance', width: 150, type: 'percentage' },
    { name: 'moneyness_ratio', width: 200, type: 'percentage' },

    { name: 'days_to_expiration', width: 200, type: 'number' },

    { name: 'premium_underlying_ratio', width: 200, type: 'percentage' },
    { name: 'premium_iv_ratio', width: 200, type: 'percentage' },
    { name: 'theta_premium_ratio', width: 200, type: 'percentage' },
    { name: 'theta_efficiency', width: 200, type: 'percentage' },
    { name: 'premium_to_breakeven', width: 200, type: 'percentage' },
]
