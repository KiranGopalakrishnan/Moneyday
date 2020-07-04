package com.projector.expenses.bean

import com.projector.common.modals.Id
import com.projector.expenses.modals.Expense
import com.projector.expenses.modals.User
import java.time.LocalDate

data class ExpensePostBean(
        val description: String,
        val date: String,
        val boardId: String,
        val userId: String
) {


    fun toDomain(): Expense {
        return Expense(
                description = description,
                date =  LocalDate.parse(date),
                boardId = boardId,
                user = User(Id(userId))
        )
    }
}