package com.projector.expenses.repository

enum class ExpenseDocument(val key: String) {
    ID("id"),
    BOARD_ID("board_id"),
    DESCRIPTION("description"),
    DATE("date"),
    USER_ID("user_id")
}