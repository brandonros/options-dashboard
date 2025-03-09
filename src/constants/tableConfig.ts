export const COLUMNS = [
    { name: 'instrument_type', type: 'string', alias: 'type' },

    { name: 'symbol', type: 'string' },
    { name: 'underlying_last_trade_price', type: 'currency', alias: 'underlying' },

    { name: 'strike_price', type: 'currency', alias: 'strike' },
    { name: 'mark_price', type: 'currency', alias: 'mark' },
    { name: 'moneyness_distance_percentage', type: 'percentage', alias: 'strike_dist' },
    { name: 'moneyness', type: 'string' },

    { name: 'prob_itm_at_expiration', type: 'percentage', alias: 'prob_itm' },
    { name: 'expiration_date', type: 'date', alias: 'exp' },
    { name: 'days_to_expiration', type: 'number', advanced: true },
    { name: 'capital_commitment_period', type: 'number', alias: 'num_days' },

    { name: 'simple_roi', type: 'percentage', alias: 'roi' },
    { name: 'daily_simple_roi', type: 'percentage', alias: 'roi_day' },
    { name: 'annualized_simple_roi', type: 'percentage', alias: 'roi_year' },

    { name: 'implied_volatility', type: 'percentage', alias: 'iv' },
    { name: 'straddle_implied_move_percent', type: 'percentage', alias: 'impl_move_pct' },
    { name: 'straddle_implied_move_dollars', type: 'currency', alias: 'impl_move_usd' },

    { name: 'bid_price', type: 'currency', alias: 'bid' },
    { name: 'ask_price', type: 'currency', alias: 'ask' },
    { name: 'last_trade_price', type: 'currency', alias: 'last' },
    { name: 'bid_ask_spread', type: 'currency', alias: 'spread' },
    { name: 'slippage_impact', type: 'percentage', alias: 'slippage_pct' },

    { name: 'volume', type: 'number', alias: 'volume' },
    { name: 'open_interest', type: 'number', alias: 'oi' },
    { name: 'volume_open_interest_ratio', type: 'percentage', alias: 'volume_oi_ratio' },

    { name: 'intrinsic_value', type: 'currency', alias: 'int_value', advanced: true },
    { name: 'extrinsic_value', type: 'currency', alias: 'ext_value', advanced: true },

    { name: 'break_even', type: 'currency', advanced: true },
    { name: 'long_distance_to_breakeven', type: 'currency', alias: 'dist_to_breakeven_long', advanced: true },
    { name: 'short_distance_to_breakeven', type: 'currency', alias: 'dist_to_breakeven_short', advanced: true },
    { name: 'long_percentage_distance_to_breakeven', type: 'percentage', alias: 'dist_to_breakeven_long_pct', advanced: true },
    { name: 'short_percentage_distance_to_breakeven', type: 'percentage', alias: 'dist_to_breakeven_short_pct', advanced: true },

    { name: 'secured_ror', type: 'percentage', alias: 'ror_secured', advanced: true },
    { name: 'daily_secured_ror', type: 'percentage', alias: 'ror_secured_day', advanced: true },
    { name: 'annualized_secured_ror', type: 'percentage', alias: 'ror_secured_year', advanced: true },

    { name: 'naked_ror', type: 'percentage', alias: 'ror_naked', advanced: true },
    { name: 'daily_naked_ror', type: 'percentage', alias: 'ror_naked_day', advanced: true },
    { name: 'annualized_naked_ror', type: 'percentage', alias: 'ror_naked_year', advanced: true },

    { name: 'moneyness_ratio', type: 'percentage', advanced: true },
    { name: 'implied_moneyness_percentage', type: 'percentage', advanced: true },

    { name: 'premium_underlying_ratio', type: 'percentage', advanced: true },
    { name: 'premium_iv_ratio', type: 'percentage', advanced: true },
    { name: 'theta_efficiency', type: 'percentage', advanced: true },
    { name: 'theta_premium_ratio', type: 'percentage', advanced: true },
    { name: 'time_value_ratio', type: 'percentage', advanced: true },

    { name: 'delta', type: 'number', advanced: true },
    { name: 'gamma', type: 'number', advanced: true },
    { name: 'theta', type: 'number', advanced: true },
    { name: 'vega', type: 'number', advanced: true },
    { name: 'rho', type: 'number', advanced: true },

    { name: 'absolute_moneyness_distance', type: 'number', advanced: true },
    { name: 'complementary_mark_price', type: 'number', advanced: true },

    { name: 'option_identifier', type: 'string', advanced: true },
    { name: 'complementary_option_identifier', type: 'string', advanced: true },

    { name: 'scraped_at', type: 'datetime', advanced: true },

    { name: 'daily_probability_time_decay', type: 'number', advanced: true },
    { name: 'delta_exposure_risk', type: 'number', advanced: true },
    { name: 'expected_daily_move_percentage', type: 'percentage', advanced: true },
    { name: 'expected_terminal_itm_probability', type: 'number', advanced: true },
    { name: 'extrinsic_value_density', type: 'number', advanced: true },
    { name: 'iv_normalized_implied_moneyness_percentage', type: 'percentage', advanced: true },
    { name: 'max_delta_change', type: 'string', advanced: true },
    { name: 'moneyness_distance_percentage_per_iv', type: 'string', advanced: true },
    { name: 'naked_margin_requirement', type: 'currency', advanced: true },
    { name: 'normalized_log_moneyness', type: 'number', advanced: true },
    { name: 'normalized_premium_per_probability_unit', type: 'number', advanced: true },
    { name: 'potential_assignment_loss', type: 'number', advanced: true },
    { name: 'premium_collected', type: 'number', advanced: true },
    { name: 'prob_skew', type: 'number', advanced: true },
    { name: 'probability_efficiency_ratio', type: 'number', advanced: true },
    { name: 'probability_normalized_implied_moneyness_percentage', type: 'percentage', advanced: true },
    { name: 'probability_underlying_price_sensitivity', type: 'number', advanced: true },
    { name: 'probability_volatility_sensitivity', type: 'number', advanced: true },
    { name: 'raw_premium_per_probability_unit', type: 'number', advanced: true },
    { name: 'secured_capital_requirement', type: 'currency', advanced: true },
    { name: 'straddle_price', type: 'currency', advanced: true },
    { name: 'theoretical_itm_prob', type: 'percentage', advanced: true },
    { name: 'time_normalized_implied_moneyness_percentage', type: 'percentage', advanced: true },
    { name: 'underlying_implied_volatility', type: 'number', advanced: true },
    { name: 'vol_skew_ratio', type: 'number', advanced: true },
    { name: 'volatility_implied_move_dollars', type: 'currency', advanced: true },
    { name: 'volatility_implied_move_percent', type: 'percentage', advanced: true },
]
