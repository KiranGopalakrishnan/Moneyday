package com.projector.expenses

import com.projector.common.http.transformOrThrow
import com.projector.expenses.bean.ExpenseBean
import com.projector.expenses.bean.ExpensePostBean
import com.projector.expenses.services.ExpensesService
import org.springframework.beans.factory.annotation.Autowired
import javax.ws.rs.*
import javax.ws.rs.core.MediaType

data class ExpenseWrapperBean(val expenses: List<ExpenseBean>);

@Path("/expenses")
class ExpensesResource {
    @Autowired
    lateinit var expensesService: ExpensesService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun getProjects(): ExpenseWrapperBean {
        return expensesService.getAllProjects().transformOrThrow {
            ExpenseWrapperBean(
                expenses = this.map { ExpenseBean.from(it) }
            )
        }

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun createProject(expensePostBean: ExpensePostBean): ExpenseBean {
        return expensesService.create(
                expensePostBean.toDomain()
        ).transformOrThrow { ExpenseBean.from(this) }

    }

}