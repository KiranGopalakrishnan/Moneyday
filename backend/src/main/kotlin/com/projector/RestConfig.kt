package com.projector

import com.projector.boards.BoardsResource
import com.projector.common.http.AppExceptionHandler
import com.projector.expenses.ExpensesResource
import com.projector.rates.RatesResource
import com.projector.timerecords.TimeRecordsResource
import org.glassfish.jersey.server.ResourceConfig
import org.springframework.stereotype.Component

@Component
class RestConfig: ResourceConfig(){

    init {
        registerEndPoints()
    }

    fun registerEndPoints() {
        register(ExpensesResource())
        register(TimeRecordsResource())
        register(BoardsResource())
        register(RatesResource())
        register(AppExceptionHandler())
    }

}