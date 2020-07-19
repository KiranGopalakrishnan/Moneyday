package com.projector.timerecords.services

import com.projector.common.http.NotFound
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.timerecords.modals.TimeRecord
import com.projector.timerecords.repository.TimeRecordsRepository
import org.springframework.stereotype.Service

@Service
class TimeRecordService(val timeRecordsRepository: TimeRecordsRepository) {

    fun getAllTimeRecordsForBoard(boardId: Int): Response<List<TimeRecord>> {
        val records = timeRecordsRepository.getRecordsForBoard(boardId)
        return if(records != null){
            Success(records)
        }else{
            NotFound{"No time records found for board"}
        }
    }

    fun getTimeRecordsForItem(boardId: String,itemId: String): Response<List<TimeRecord>> {
        val records = timeRecordsRepository.getRecordsForItem(boardId,itemId)
        return if(records != null){
            Success(records)
        }else{
            NotFound{"No time records found for item"}
        }

    }

}