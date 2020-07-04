package com.projector.expenses.modals

import com.projector.common.modals.Id
import java.time.LocalDate

data class Expense(
        val id: Id? = Id(),
        val boardId: String,
        val description:String,
        val date: LocalDate,
        val user: User
)