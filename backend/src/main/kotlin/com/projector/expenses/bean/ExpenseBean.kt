package com.projector.expenses.bean

import com.projector.expenses.modals.Expense
import kotlin.math.exp


data class ExpenseBean(
        val id: String?,
        val description: String,
        val date: String,
        val boardId: String,
        val userId: String
) {
    companion object{
        fun from(expense: Expense): ExpenseBean {
            return ExpenseBean(
                    id = expense.id?.value,
                    description = expense.description,
                    date = expense.date.toString(),
                    boardId = expense.boardId,
                    userId = expense.user.id.value
            )
        }
    }
}