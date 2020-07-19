package com.projector.boards.services

import com.projector.boards.modals.Board
import com.projector.boards.respository.BoardsRepository
import com.projector.common.http.InvalidRequest
import com.projector.common.http.NotFound
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.common.modals.NumberId
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class BoardsService(val boardsRepository: BoardsRepository) {

    fun getBoardById(id: NumberId): Response<Board> {
       val result = boardsRepository.getBoardById(id)
        return if(result != null){
            Success(result)
        }else{
            NotFound{"No Board found"}
        }
    }

    fun setBudgetForBoard(id: NumberId, budget: BigDecimal): Response<Board> {
        val result = boardsRepository.getBoardById(id)
        return if(result != null){
            val updatedBoard = result.copy(budget = budget);
            boardsRepository.save(updatedBoard)
            Success(updatedBoard)
        }else{
            NotFound{ "Board id not found"}
        }
    }

    fun startTrackingBoard(board: Board): Response<Board> {
        val result = board.boardId?.let { boardsRepository.getBoardById(it) }
        return if(result == null){
            boardsRepository.save(board)
            Success(board)
        }else{
            InvalidRequest{"Already tracking this board"}
        }
    }

}