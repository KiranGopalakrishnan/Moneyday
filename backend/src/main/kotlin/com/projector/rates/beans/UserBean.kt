package com.projector.rates.beans

import com.projector.rates.modals.RateType
import com.projector.rates.modals.User
import java.math.BigDecimal

data class UserBean(
        val id: String,
        val userId: Int?,
        val boardId: Int?,
        val rate: BigDecimal,
        val rateType: String
) {

    companion object{
        fun from(user: User): UserBean{
            return UserBean(
                    id = user.id.value,
                    userId = user.userId?.value,
                    boardId = user.boardId?.value,
                    rate = user.rate,
                    rateType = user.rateType.name
            )
        }
    }

}