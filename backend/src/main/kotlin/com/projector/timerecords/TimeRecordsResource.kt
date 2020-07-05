package com.projector.timerecords

import com.projector.common.http.transformOrThrow
import com.projector.expenses.bean.ExpenseBean
import com.projector.expenses.bean.ExpensePostBean
import com.projector.expenses.services.ExpensesService
import com.projector.timerecords.bean.TimeRecordBean
import com.projector.timerecords.services.TimeRecordService
import org.springframework.beans.factory.annotation.Autowired
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

data class TimeRecordsWrapperBean(val timerecords: List<TimeRecordBean>);

@Path("/timerecords")
class TimeRecordsResource {
    @Autowired
    lateinit var timeRecordService: TimeRecordService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/boards/{boardId}")
    fun getTimeRecordsForBoard(@PathParam("boardId") boardId:String): TimeRecordsWrapperBean {
        return timeRecordService.getAllTimeRecordsForBoard(boardId).transformOrThrow {
            TimeRecordsWrapperBean(
                    timerecords = this.map { TimeRecordBean.from(it) }
            )
        }

    }
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/boards/{boardId}/items/{itemId}")
    fun getTimeRecordsForItem(
            @PathParam("boardId") boardId:String,
            @PathParam("itemId") itemId:String
    ): TimeRecordsWrapperBean {
        return timeRecordService.getTimeRecordsForItem(boardId,itemId).transformOrThrow {
            TimeRecordsWrapperBean(
                    timerecords = this.map { TimeRecordBean.from(it) }
            )
        }

    }

}