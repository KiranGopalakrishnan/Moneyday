package com.projector.timerecords.repository.mapper

import com.projector.common.modals.Id
import com.projector.common.mongo.DocumentMapper
import com.projector.timerecords.modals.TimeRecord
import com.projector.timerecords.repository.TimeRecordDocument
import org.bson.Document
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.ZoneOffset

object TimeRecordDocumentMapper: DocumentMapper<TimeRecord> {
    override fun toDocument(domainObject: TimeRecord): Document {
        val document = Document();
        return document
                .append(TimeRecordDocument.ID.key,domainObject.id.value)
                .append(TimeRecordDocument.BOARD_ID.key,domainObject.boardId.value)
                .append(TimeRecordDocument.DURATION.key,domainObject.duration)

    }

    override fun fromDocument(document: Document): TimeRecord {
        val id = document.getString(TimeRecordDocument.ID.key)
        val boardId = document.getString(TimeRecordDocument.BOARD_ID.key)
        val itemId = document.getString(TimeRecordDocument.ITEM_ID.key)
        val duration = document.getInteger(TimeRecordDocument.DURATION.key)
        val startDate = document.getInteger(TimeRecordDocument.STARTDATE.key)
        val changedAt = document.getString(TimeRecordDocument.CHANGEDAT.key)
        return TimeRecord(
                id = Id(id),
                boardId = Id(boardId),
                itemId = Id(itemId),
                duration = duration,
                startDate = LocalDate.ofInstant(Instant.ofEpochMilli(startDate.toLong()), ZoneId.systemDefault()),
                changedAt = LocalDate.ofInstant(Instant.parse(changedAt),ZoneId.of(ZoneOffset.UTC.getId()))
        )
    }

}