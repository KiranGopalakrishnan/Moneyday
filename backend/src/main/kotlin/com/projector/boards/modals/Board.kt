package com.projector.boards.modals

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import java.math.BigDecimal

data class Board(
        val id: Id = Id(),
        val boardId: NumberId?,
        val budget:BigDecimal? = null,
        val currencyCode: String? = "USD",
        val timeframe: Timeframe? = null,
        val defaultRate: BigDecimal = BigDecimal(0.00)
)

