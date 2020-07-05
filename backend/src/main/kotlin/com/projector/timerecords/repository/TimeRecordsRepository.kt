package com.projector.timerecords.repository

import com.mongodb.client.model.Filters
import com.projector.common.mongo.CollectionFactory
import com.projector.common.mongo.EntityCollection
import com.projector.expenses.modals.Expense
import com.projector.expenses.repository.mapper.ExpenseDocumentMapper
import com.projector.timerecords.modals.TimeRecord
import com.projector.timerecords.repository.mapper.TimeRecordDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class TimeRecordsRepository(val collectionFactory: CollectionFactory) {
    companion object{
        val COLLECTION_NAME = "timerecords"
    }

    private val entityCollection: EntityCollection<TimeRecord> = collectionFactory.create(COLLECTION_NAME, TimeRecordDocumentMapper)

    fun getRecordsForBoard(boardId: String): List<TimeRecord>? {
        return entityCollection.findAll(Filters.eq(TimeRecordDocument.BOARD_ID.key,boardId))
    }

    fun getRecordsForItem(boardId: String, itemId: String): List<TimeRecord>? {
        return entityCollection.findAll(Filters.and(
                Filters.eq(TimeRecordDocument.BOARD_ID.key,boardId),
                Filters.eq(TimeRecordDocument.ITEM_ID.key,itemId)
        ))
    }

}