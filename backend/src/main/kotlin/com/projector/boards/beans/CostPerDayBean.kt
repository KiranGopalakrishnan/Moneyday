package com.projector.boards.beans

import com.projector.boards.modals.CostPerDay
import java.math.BigDecimal
import java.time.format.DateTimeFormatter

class CostPerDayBean (
            val date: String,
            val cost: BigDecimal
    ){
        companion object{
            fun from(costPerDay: CostPerDay): CostPerDayBean {
                return CostPerDayBean(
                        date = costPerDay.date.format(DateTimeFormatter.ISO_DATE),
                        cost = costPerDay.cost?: BigDecimal(0.00)
                )
            }
        }
}