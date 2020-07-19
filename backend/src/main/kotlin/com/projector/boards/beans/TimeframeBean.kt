package com.projector.boards.beans

import com.projector.boards.modals.Timeframe

data class TimeframeBean(
        val startDate: String,
        val endDate: String
){
    companion object{
        fun from(timeframe: Timeframe): TimeframeBean {
            return TimeframeBean(
                    startDate = timeframe.startDate.toString(),
                    endDate = timeframe.endDate.toString()
            )
        }
    }
}