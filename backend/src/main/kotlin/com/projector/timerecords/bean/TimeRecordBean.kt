package com.projector.timerecords.bean

import com.projector.timerecords.modals.TimeRecord

data class TimeRecordBean(
        val id: String,
        val boardId: String,
        val itemId: String,
        val duration: Int
){
    companion object{
        fun from(timeRecord: TimeRecord): TimeRecordBean {
            return TimeRecordBean(
                    id = timeRecord.id.value,
                    boardId = timeRecord.boardId.value,
                    itemId = timeRecord.itemId.value,
                    duration = timeRecord.duration
            )
        }
    }
}