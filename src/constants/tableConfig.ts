export const COLUMNS =[
    { name: 'instrument_type', type: 'string' },

    { name: 'symbol', type: 'string' },
    { name: 'underlying_last_trade_price', type: 'currency' },

    { name: 'strike_price', type: 'currency' },
    { name: 'mark_price', type: 'currency' },
    { name: 'moneyness_distance', type: 'percentage' },
    { name: 'moneyness', type: 'string' },

    { name: 'prob_itm_at_expiration', type: 'percentage' },
    { name: 'expiration_date', type: 'date' },
    // { name: 'days_to_expiration', type: 'number' },
    { name: 'capital_commitment_period', type: 'number' },

    { name: 'simple_roi', type: 'percentage' },
    { name: 'daily_simple_roi', type: 'percentage' },
    { name: 'annualized_simple_roi', type: 'percentage' },

    { name: 'risk_adjusted_daily_simple_roi', type: 'percentage' },
    { name: 'implied_volatility', type: 'percentage' },
    { name: 'volatility_prob_itm_ratio', type: 'percentage' },

    { name: 'expected_move_percent', type: 'percentage' },
    { name: 'expected_move_dollars', type: 'currency' },
    { name: 'margin_of_safety', type: 'currency' },
    { name: 'margin_of_safety_percentage', type: 'percentage' },
    { name: 'adjusted_margin_of_safety_percentage', type: 'percentage' },

    // { name: 'daily_secured_ror_per_iv', type: 'percentage' },
    // { name: 'daily_secured_ror_per_expected_move', type: 'percentage' },
    // { name: 'daily_secured_ror_per_delta', type: 'percentage' },
    // { name: 'daily_secured_ror', type: 'percentage' },
    // { name: 'secured_ror', type: 'percentage' },
    // { name: 'naked_ror', type: 'percentage' },

    { name: 'bid_price', type: 'currency' },
    { name: 'ask_price', type: 'currency' },
    { name: 'last_trade_price', type: 'currency' },
    { name: 'bid_ask_spread', type: 'currency' },
    { name: 'slippage_impact', type: 'percentage' },

    { name: 'volume', type: 'number' },
    { name: 'open_interest', type: 'number' },
    { name: 'volume_open_interest_ratio', type: 'percentage' },

    { name: 'intrinsic_value', type: 'currency' },
    { name: 'extrinsic_value', type: 'currency' },

    { name: 'break_even', type: 'currency' },
    { name: 'distance_to_breakeven', type: 'currency' },

    { name: 'moneyness_ratio', type: 'percentage' },

    { name: 'premium_iv_ratio', type: 'percentage' },
    { name: 'theta_efficiency', type: 'percentage' },

    { name: 'delta', type: 'number' },
    { name: 'gamma', type: 'number' },
    { name: 'theta', type: 'number' },
    { name: 'vega', type: 'number' },
    { name: 'rho', type: 'number' },
]
