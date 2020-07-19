package com.projector.rates.beans

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import com.projector.rates.modals.User
import java.math.BigDecimal

data class UserPostBean(
        val rate: BigDecimal
){
        fun toDomainObject(): User {
            return User(
                    rate = rate
            )
        }
}