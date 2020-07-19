package com.projector.boards

import com.projector.boards.beans.BoardBean
import com.projector.boards.beans.BoardPostBean
import com.projector.boards.beans.CostPerDayBean
import com.projector.boards.beans.CostSummaryBean
import com.projector.boards.services.BoardsService
import com.projector.boards.services.CostService
import com.projector.common.http.transformOrThrow
import com.projector.common.modals.NumberId
import org.springframework.beans.factory.annotation.Autowired
import java.math.BigDecimal
import javax.ws.rs.*
import javax.ws.rs.core.MediaType


data class CostPerDayWrapperBean (val costPerDay: List<CostPerDayBean>){}

@Path("/boards")
class BoardsResource {

    @Autowired
    lateinit var boardsService: BoardsService;
    @Autowired
    lateinit var costService: CostService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    fun getBoardById(
            @PathParam("id")
            id: Int
    ): BoardBean {
        return boardsService.getBoardById(NumberId(id)).transformOrThrow {
                    BoardBean.from(this)
        }

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    fun stratTrackingBoard(
            @PathParam("id")
            id: Int,
            board: BoardPostBean
    ): BoardBean {
        return boardsService.startTrackingBoard(board.toDomain().copy(boardId=NumberId(id))).transformOrThrow {
            BoardBean.from(this)
        }

    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/budget/{value}")
    fun setBudget(
            @PathParam("id")
            id: Int,
            @PathParam("value")
            budget: BigDecimal

    ): BoardBean {
        return boardsService.setBudgetForBoard(NumberId(id),budget).transformOrThrow {
            BoardBean.from(this)
        }

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/costSummary")
    fun getCostSummary(
            @PathParam("id")
            id: Int
    ): CostSummaryBean {
        return costService.calculateLaborCostsForBoard(NumberId(id)).transformOrThrow {
            CostSummaryBean.from(this)
        }

    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}/cost-per-day")
    fun getCostPerDay(
            @PathParam("id")
            id: Int
    ): CostPerDayWrapperBean {
        return costService.getCostsByDay(NumberId(id)).transformOrThrow {
            CostPerDayWrapperBean(costPerDay = this.map { CostPerDayBean.from(it) })
        }

    }



}