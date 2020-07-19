package com.projector.rates.services

import com.projector.common.http.NotFound
import com.projector.common.http.Response
import com.projector.common.http.Success
import com.projector.common.modals.NumberId
import com.projector.rates.modals.User
import com.projector.rates.repository.RateRepository
import org.springframework.stereotype.Service

@Service
class RatesService(
        val rateRepository: RateRepository
) {

    fun addRate(user: User): Response<User> {
        val exisitingUser = user.boardId?.let {
            user.userId?.let { it1 -> rateRepository.findUser(boardId = it, userId = it1) }
        }
        return if(exisitingUser != null){
            val updatedUser = exisitingUser.copy(rate = user.rate);
            rateRepository.save(updatedUser)
            Success(updatedUser)
        }else{
            rateRepository.save(user)
            Success(user)
        }
    }

    fun getAllRatesForBoard(boardId: NumberId): Response<List<User>>{
        val users = rateRepository.getAllRatesForBoard(boardId)
        return if(users != null){
            Success(users)
        }else{
            NotFound{"No users found for board"}
        }
    }

}