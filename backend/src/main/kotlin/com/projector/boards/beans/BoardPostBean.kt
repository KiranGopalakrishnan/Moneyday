package com.projector.boards.beans

import com.projector.boards.modals.Board
import com.projector.boards.modals.Timeframe
import java.math.BigDecimal
import java.time.LocalDate

data class BoardPostBean(
        val budget: BigDecimal,
        val currencyCode: String,
        val timeframe: TimeframeBean,
        val defaultRate: BigDecimal
        ){
        fun toDomain(): Board {
            return Board(
                    boardId = null,
                    budget = budget,
                    currencyCode = currencyCode,
                    timeframe = Timeframe(
                            startDate = LocalDate.parse(timeframe.startDate),
                            endDate = LocalDate.parse(timeframe.endDate)
                    ),
                    defaultRate = defaultRate
            )
        }
}