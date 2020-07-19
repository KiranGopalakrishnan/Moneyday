package com.projector.rates.modals

import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import java.math.BigDecimal

enum class RateType {
    USER,
    BILLING
}

data class User(
        val id: Id = Id(),
  val userId: NumberId? = null,
  val boardId: NumberId? = null,
  val rate: BigDecimal,
  val rateType: RateType = RateType.USER
)