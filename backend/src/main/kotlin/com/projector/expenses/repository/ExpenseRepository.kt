package com.projector.expenses.repository

import com.mongodb.client.model.Filters
import com.projector.common.modals.Id
import com.projector.common.mongo.CollectionFactory
import com.projector.common.mongo.EntityCollection
import com.projector.expenses.modals.Expense
import com.projector.expenses.modals.User
import com.projector.expenses.repository.mapper.ExpenseDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class ExpenseRepository(val collectionFactory: CollectionFactory) {

    private val COLLECTION_NAME = "expenses"

    private val entityCollection: EntityCollection<Expense> = collectionFactory.create(COLLECTION_NAME, ExpenseDocumentMapper)

    fun save(project: Expense) {
         entityCollection.save(project)
    }

    fun getAllExpenses(): List<Expense>? {
        return entityCollection.findAll()
    }

    fun getExpensesByUser(user:User): List<Expense>? {
        return entityCollection.findAll(Filters.eq(ExpenseDocument.USER_ID.key,user.id.value))
    }

    fun getExpense(id: Id): Expense? {
        return entityCollection.findOne(Filters.eq(ExpenseDocument.ID.key,id.value))
    }
}