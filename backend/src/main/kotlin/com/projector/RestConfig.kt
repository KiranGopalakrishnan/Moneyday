package com.projector

import com.projector.common.http.AppExceptionHandler
import com.projector.expenses.ExpensesResource
import org.glassfish.jersey.server.ResourceConfig
import org.springframework.stereotype.Component

@Component
class RestConfig: ResourceConfig(){

    init {
        registerEndPoints()
    }

    fun registerEndPoints() {
        register(ExpensesResource())
        register(AppExceptionHandler())
    }

}