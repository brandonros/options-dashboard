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
    // { name: 'days_to_expiration', type: 'number' },
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

    { name: 'intrinsic_value', type: 'currency', alias: 'int_value' },
    { name: 'extrinsic_value', type: 'currency', alias: 'ext_value' },

    { name: 'break_even', type: 'currency' },
    { name: 'long_distance_to_breakeven', type: 'currency', alias: 'dist_to_breakeven_long' },
    { name: 'short_distance_to_breakeven', type: 'currency', alias: 'dist_to_breakeven_short' },
    { name: 'long_percentage_distance_to_breakeven', type: 'percentage', alias: 'dist_to_breakeven_long_pct' },
    { name: 'short_percentage_distance_to_breakeven', type: 'percentage', alias: 'dist_to_breakeven_short_pct' },

    { name: 'secured_ror', type: 'percentage', alias: 'ror_secured' },
    { name: 'daily_secured_ror', type: 'percentage', alias: 'ror_secured_day' },
    { name: 'annualized_secured_ror', type: 'percentage', alias: 'ror_secured_year' },

    { name: 'naked_ror', type: 'percentage', alias: 'ror_naked' },
    { name: 'daily_naked_ror', type: 'percentage', alias: 'ror_naked_day' },
    { name: 'annualized_naked_ror', type: 'percentage', alias: 'ror_naked_year' },

    { name: 'moneyness_ratio', type: 'percentage' },
    { name: 'implied_moneyness_percentage', type: 'percentage' },

    { name: 'premium_underlying_ratio', type: 'percentage' },
    { name: 'premium_iv_ratio', type: 'percentage' },
    { name: 'theta_efficiency', type: 'percentage' },
    { name: 'theta_premium_ratio', type: 'percentage' },
    { name: 'time_value_ratio', type: 'percentage' },

    { name: 'delta', type: 'number' },
    { name: 'gamma', type: 'number' },
    { name: 'theta', type: 'number' },
    { name: 'vega', type: 'number' },
    { name: 'rho', type: 'number' },

    { name: 'absolute_moneyness_distance', type: 'number' },
    { name: 'complementary_mark_price', type: 'number' },

    { name: 'option_identifier', type: 'string' },
    { name: 'complementary_option_identifier', type: 'string' },

    { name: 'scraped_at', type: 'datetime' },

    { name: 'daily_probability_time_decay', type: 'number' },
    { name: 'delta_exposure_risk', type: 'number' },
    { name: 'expected_daily_move_percentage', type: 'percentage' },
    { name: 'expected_terminal_itm_probability', type: 'number' },
    { name: 'extrinsic_value_density', type: 'number' },
    { name: 'iv_normalized_implied_moneyness_percentage', type: 'percentage' },
    { name: 'max_delta_change', type: 'string' },
    { name: 'moneyness_distance_percentage_per_iv', type: 'string' },
    { name: 'naked_margin_requirement', type: 'currency' },
    { name: 'normalized_log_moneyness', type: 'number' },
    { name: 'normalized_premium_per_probability_unit', type: 'number' },
    { name: 'potential_assignment_loss', type: 'number' },
    { name: 'premium_collected', type: 'number' },
    { name: 'prob_skew', type: 'number' },
    { name: 'probability_efficiency_ratio', type: 'number' },
    { name: 'probability_normalized_implied_moneyness_percentage', type: 'percentage' },
    { name: 'probability_underlying_price_sensitivity', type: 'number' },
    { name: 'probability_volatility_sensitivity', type: 'number' },
    { name: 'raw_premium_per_probability_unit', type: 'number' },
    { name: 'secured_capital_requirement', type: 'currency' },
    { name: 'straddle_price', type: 'currency' },
    { name: 'theoretical_itm_prob', type: 'percentage' },
    { name: 'time_normalized_implied_moneyness_percentage', type: 'percentage' },
    { name: 'underlying_implied_volatility', type: 'number' },
    { name: 'vol_skew_ratio', type: 'number' },
    { name: 'volatility_implied_move_dollars', type: 'currency' },
    { name: 'volatility_implied_move_percent', type: 'percentage' },
]
