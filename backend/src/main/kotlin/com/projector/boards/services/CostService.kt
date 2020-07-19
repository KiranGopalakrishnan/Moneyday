package com.projector.boards.services

import com.projector.boards.modals.CostPerDay
import com.projector.boards.modals.CostSummary
import com.projector.boards.respository.BoardsRepository
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.common.modals.NumberId
import com.projector.timerecords.repository.TimeRecordsRepository
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

@Service
class CostService(val timeRecordsRepository: TimeRecordsRepository,val  boardsRepository: BoardsRepository) {

    fun calculateLaborCostsForBoard(boardId: NumberId): Success<CostSummary> {
       val records =  timeRecordsRepository.getRecordsForBoard(boardId = boardId.value)
        val board = boardsRepository.getBoardById(boardId)
        val totalTimeSpent = records?.sumBy { it.duration }
        val totalCost = board.let { totalTimeSpent?.toBigDecimal()?.let { timeSpent -> it?.defaultRate?.times((timeSpent / BigDecimal(3600))) } }
        return Success(CostSummary(totalTimeSpent = totalTimeSpent,totalCost = totalCost))
    }

    fun getCostsByDay(boardId: NumberId): Response<List<CostPerDay>> {
        val records = timeRecordsRepository.getRecordsForBoard(boardId = boardId.value)
        val board = boardsRepository.getBoardById(boardId)
        val groupedByDate = records?.groupBy { Instant.ofEpochMilli(it.timeRecordDate.toLong()).atZone(ZoneId.systemDefault()).toLocalDate() }
        val costsPerDay = groupedByDate?.map { CostPerDay(
                date = it.key,
                cost = board?.defaultRate?.times(it.value.sumBy {
                    records -> records.duration
                }.toBigDecimal()/BigDecimal(3600))
        ) } ?: emptyList()


        val cumulativeCosts = costsPerDay.sortedBy { it.date }.reductions(CostPerDay(cost = BigDecimal(0.00),date = LocalDate.now())){
            acc, costPerDay ->
            CostPerDay(cost = acc.cost?.add(costPerDay.cost),date = costPerDay.date)
        }.toList()

        return Success(cumulativeCosts)
    }

}

fun <T, R> List<T>.reductions(initial: R, operation: (acc: R, T) -> R) : Sequence<R> = sequence {
    var last = initial
    forEach {
        last = operation(last, it)
        yield(last)
    }
}