package com.projector.timerecords.repository


enum class TimeRecordDocument(val key: String) {
    ID("id"),
    BOARD_ID("board_id"),
    DURATION("duration"),
    ITEM_ID("item_id"),
    RUNNING("running"),
    STARTDATE("startDate"),
    CHANGEDAT("changed_at")
}