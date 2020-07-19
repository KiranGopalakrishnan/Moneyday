package com.projector.timerecords.bean

import com.projector.timerecords.modals.TimeRecord

data class TimeRecordBean(
        val id: String,
        val userId: Int,
        val boardId: Int,
        val taskId: Int,
        val duration: Int,
        val startDate: Int,
        val endDate: Int,
        val timeRecordDate: Double
){
    companion object{
        fun from(timeRecord: TimeRecord): TimeRecordBean {
            return TimeRecordBean(
                    id = timeRecord.id.value,
                    userId = timeRecord.userId.value,
                    boardId = timeRecord.boardId.value,
                    taskId = timeRecord.taskId.value,
                    duration = timeRecord.duration,
                    startDate = timeRecord.startDate,
                    endDate = timeRecord.endDate,
                    timeRecordDate = timeRecord.timeRecordDate
            )
        }
    }
}