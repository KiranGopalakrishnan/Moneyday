package com.projector.rates.repository.mapper

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import com.projector.common.mongo.DocumentMapper
import com.projector.rates.modals.RateType
import com.projector.rates.modals.User
import com.projector.rates.repository.RateDocument
import org.bson.Document
import java.math.BigDecimal

object UserDocumentMapper: DocumentMapper<User> {
        override fun toDocument(domainObject: User): Document {
            val document = Document()
            document.append(RateDocument.ID.key, domainObject.id?.value)
            document.append(RateDocument.BOARD_ID.key,domainObject.boardId?.value)
            document.append(RateDocument.USER_ID.key,domainObject.userId?.value)
            document.append(RateDocument.RATE.key,domainObject.rate.toString())
            document.append(RateDocument.RATE_TYPE.key,domainObject.rateType.name)
            return document
        }

        override fun fromDocument(document: Document): User {
            val id = document.getString(RateDocument.ID.key)
            val boardId = document.getInteger(RateDocument.BOARD_ID.key)
            val rateType = document.getString(RateDocument.RATE_TYPE.key)
            val rate = document.getString(RateDocument.RATE.key)
            val userId = document.getInteger(RateDocument.USER_ID.key)
            return User(
                    id = Id(id),
                    boardId = NumberId(boardId),
                    userId = NumberId(userId),
                    rate = BigDecimal(rate),
                    rateType = RateType.valueOf(rateType)
            )
        }
}