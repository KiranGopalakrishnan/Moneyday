package com.projector.expenses.services

import com.projector.common.http.NotFound
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.expenses.modals.Expense
import com.projector.expenses.repository.ExpenseRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ExpensesService {
    @Autowired
    lateinit var projectRepository: ExpenseRepository
    fun getAllProjects(): Response<List<Expense>>{
        val expenses = projectRepository.getAllExpenses()
        return if(expenses != null){
            Success(expenses)
        }else{
            NotFound{ "No expenses found" }
        }
    }

    fun create(project: Expense):Response<Expense>{
        projectRepository.save(project)
        return Success(project)
    }

}