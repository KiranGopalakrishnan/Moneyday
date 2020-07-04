package com.projector.expenses.repository.mapper

import com.projector.common.modals.Id
import com.projector.common.mongo.DocumentMapper
import com.projector.expenses.modals.Expense
import com.projector.expenses.modals.User
import com.projector.expenses.repository.ExpenseDocument
import org.bson.Document
import java.time.LocalDate

object ExpenseDocumentMapper: DocumentMapper<Expense> {
    override fun toDocument(domainObject: Expense): Document {
        val document = Document()
        document.append(ExpenseDocument.ID.key, domainObject.id?.value)
        document.append(ExpenseDocument.DESCRIPTION.key,domainObject.description)
        document.append(ExpenseDocument.BOARD_ID.key,domainObject.boardId)
        document.append(ExpenseDocument.USER_ID.key,domainObject.user.id.value)
        return document
    }

    override fun fromDocument(document: Document): Expense {
        val id = document.getString(ExpenseDocument.ID.key)
        val boardId = document.getString(ExpenseDocument.BOARD_ID.key)
        val description = document.getString(ExpenseDocument.DESCRIPTION.key)
        val date = document.getString(ExpenseDocument.DATE.key)
        val userId = document.getString(ExpenseDocument.USER_ID.key)
        return Expense(
                id = Id(id),
                boardId = boardId,
                description = description,
                date = LocalDate.parse(date),
                user = User(Id(userId))
        )
    }
}