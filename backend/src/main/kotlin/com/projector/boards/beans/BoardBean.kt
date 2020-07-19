package com.projector.boards.beans

import com.projector.boards.modals.Board
import java.math.BigDecimal

data class BoardBean(
        val id: Int?,
        val budget: BigDecimal?,
        val currencyCode: String?,
        val timeframe: TimeframeBean?,
        val defaultRate: BigDecimal?
) {
    companion object{
        fun from(board: Board): BoardBean {
            return BoardBean(
                    id = board.boardId?.value,
                    budget= board.budget,
                    currencyCode = board.currencyCode,
                    timeframe = board.timeframe?.let { TimeframeBean.from(it) },
                    defaultRate = board.defaultRate
            )
        }
    }
}