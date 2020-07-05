package com.projector.timerecords.modals

import com.projector.common.modals.Id
import java.time.LocalDate

data class TimeRecord(
        val id: Id,
        val boardId: Id,
        val startDate: LocalDate?,
        val duration: Int,
        val changedAt: LocalDate?,
        val itemId: Id
)