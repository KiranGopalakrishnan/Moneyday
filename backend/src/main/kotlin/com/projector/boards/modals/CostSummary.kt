package com.projector.boards.modals

import java.math.BigDecimal
import java.time.LocalDate

data class CostPerDay(
        val date: LocalDate,
        val cost: BigDecimal? = BigDecimal(0.00)
)

data class CostSummary(
        val totalTimeSpent: Int? = 0,
        val totalCost: BigDecimal? = BigDecimal(0.00)
)