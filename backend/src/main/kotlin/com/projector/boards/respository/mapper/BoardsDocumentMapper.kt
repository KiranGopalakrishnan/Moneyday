package com.projector.boards.respository.mapper

import com.projector.boards.modals.Board
import com.projector.boards.modals.Timeframe
import com.projector.boards.respository.BoardDocument
import com.projector.boards.respository.TimeframeDocument
import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import com.projector.common.mongo.DocumentMapper
import org.bson.Document
import org.bson.types.Decimal128
import java.math.BigDecimal
import java.time.LocalDate

object BoardsDocumentMapper: DocumentMapper<Board> {
    override fun toDocument(domainObject: Board): Document {
        val timeframeDocument = Document()
        timeframeDocument
                .append(TimeframeDocument.START_DATE.key, domainObject.timeframe?.startDate.toString())
                .append(TimeframeDocument.END_DATE.key, domainObject.timeframe?.endDate.toString())
        val document = Document()
                .append(BoardDocument.ID.key,domainObject.id.value)
                .append(BoardDocument.BOARD_ID.key,domainObject.boardId!!.value)
                .append(BoardDocument.BUDGET.key,domainObject.budget)
                .append(BoardDocument.DEFAULT_RATE.key,domainObject.defaultRate)
                .append(BoardDocument.CURRENCY_CODE.key,domainObject.currencyCode)
                if(domainObject.timeframe != null) document.append(BoardDocument.TIMEFRAME.key,timeframeDocument)
        return document
    }

    override fun fromDocument(document: Document): Board {
        val id = document.getString(BoardDocument.ID.key)
        val boardId = document.getInteger(BoardDocument.BOARD_ID.key)
        val budget = document.find<Decimal128>(BoardDocument.BUDGET.key)
        val currencyCode = document.getString(BoardDocument.CURRENCY_CODE.key)
        val timeframe = document.find<Document>(BoardDocument.TIMEFRAME.key)
        val defaultRate = document.find<Decimal128>(BoardDocument.DEFAULT_RATE.key)
        val board =  Board(
                id = Id(id),
        boardId = NumberId(boardId),
        budget = budget?.bigDecimalValue(),
        currencyCode = currencyCode,
                defaultRate = defaultRate!!.bigDecimalValue()
        )
        return if(timeframe != null){
            val startDate = timeframe?.getString(TimeframeDocument.START_DATE.key)
            val endDate = timeframe?.getString(TimeframeDocument.END_DATE.key)
            board.copy(timeframe =  Timeframe(LocalDate.parse(startDate), LocalDate.parse(endDate)))
        }else{
            board
        }
    }
}

inline fun <reified T> Document.find(key: String): T? {
    return this[key] as T?
}