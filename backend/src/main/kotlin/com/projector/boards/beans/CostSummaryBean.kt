package com.projector.boards.beans

import com.projector.boards.modals.CostSummary
import java.math.BigDecimal

data class CostSummaryBean(
        val totalTimeSpent: Int?,
        val totalCost: BigDecimal?
){
    companion object{
        fun from(costSummary: CostSummary): CostSummaryBean {
            return CostSummaryBean(
                    totalTimeSpent = costSummary.totalTimeSpent,
                    totalCost = costSummary.totalCost
            )
        }
    }
}