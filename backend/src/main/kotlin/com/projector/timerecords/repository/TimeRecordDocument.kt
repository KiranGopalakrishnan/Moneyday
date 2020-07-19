package com.projector.timerecords.repository


enum class TimeRecordDocument(val key: String) {
    ID("id"),
    BOARD_ID("board_id"),
    DURATION("duration"),
    ITEM_ID("task_id"),
    RUNNING("running"),
    STARTED_AT("started_at"),
    ENDED_AT("ended_at"),
    TASK_ID("task_id"),
    USER_ID("user_id"),
    TIMERECORD_DATE("timerecord_date")
}