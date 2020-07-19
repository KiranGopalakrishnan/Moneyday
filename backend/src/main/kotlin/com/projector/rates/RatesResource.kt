package com.projector.rates

import com.projector.common.http.transformOrThrow
import com.projector.common.modals.NumberId
import com.projector.rates.beans.UserBean
import com.projector.rates.beans.UserPostBean
import com.projector.rates.modals.User
import com.projector.rates.services.RatesService
import com.projector.timerecords.TimeRecordsWrapperBean
import com.projector.timerecords.bean.TimeRecordBean
import com.projector.timerecords.services.TimeRecordService
import org.springframework.beans.factory.annotation.Autowired
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

data class UserRateWrapperBean(val rates: List<UserBean>);

@Path("boards/{boardId}/rates")
class RatesResource() {


    @Autowired
    lateinit var ratesService: RatesService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun getTimeRecordsForBoard(@PathParam("boardId") boardId: Int): UserRateWrapperBean {
        return ratesService.getAllRatesForBoard(NumberId(boardId)).transformOrThrow {
            UserRateWrapperBean(
                    rates = this.map { UserBean.from(it) }
            )
        }

    }
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    fun getTimeRecordsForItem(
            @PathParam("boardId") boardId: Int,
            @PathParam("userId") userId:Int,
            user:UserPostBean
    ): UserBean {
        return ratesService.addRate(user.toDomainObject().copy(boardId = NumberId(boardId),userId = NumberId(userId))).transformOrThrow { UserBean.from(this) }

    }

}