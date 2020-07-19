package com.projector.timerecords.modals

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId

data class TimeRecord(
        val id: Id,
        val userId: NumberId,
        val boardId: NumberId,
        val taskId: NumberId,
        val startDate: Int,
        val endDate: Int,
        val duration: Int,
        val timeRecordDate: Double
)