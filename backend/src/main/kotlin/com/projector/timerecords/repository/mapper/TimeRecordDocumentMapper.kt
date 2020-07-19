package com.projector.timerecords.repository.mapper

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import com.projector.common.mongo.DocumentMapper
import com.projector.timerecords.modals.TimeRecord
import com.projector.timerecords.repository.TimeRecordDocument
import org.bson.Document

object TimeRecordDocumentMapper: DocumentMapper<TimeRecord> {
    override fun toDocument(domainObject: TimeRecord): Document {
        return Document();

    }

    override fun fromDocument(document: Document): TimeRecord {
        val id = document.getString(TimeRecordDocument.ID.key)
        val boardId = document.getInteger(TimeRecordDocument.BOARD_ID.key)
        val userId = document.getInteger(TimeRecordDocument.USER_ID.key)
        val itemId = document.getInteger(TimeRecordDocument.ITEM_ID.key)
        val duration = document.getInteger(TimeRecordDocument.DURATION.key)
        val startDate = document.getInteger(TimeRecordDocument.STARTED_AT.key)
        val endDate = document.getInteger(TimeRecordDocument.ENDED_AT.key)
        val timeRecordDate = document.getDouble(TimeRecordDocument.TIMERECORD_DATE.key)
        return TimeRecord(
                id = Id(id),
                userId = NumberId(userId),
                boardId = NumberId(boardId),
                taskId = NumberId(itemId),
                duration = duration,
                startDate = startDate,
                endDate = endDate,
                timeRecordDate = timeRecordDate
        )
    }

}