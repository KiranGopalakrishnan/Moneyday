package com.projector.rates.repository

enum class RateDocument(val key: String) {
    ID("id"),
    USER_ID("user_id"),
    BOARD_ID("board_id"),
    RATE("rate"),
    RATE_TYPE("rate_type")
}