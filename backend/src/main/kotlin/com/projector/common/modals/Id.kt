package com.projector.common.modals

import java.util.UUID

inline class Id(val value: String = UUID.randomUUID().toString())

inline class NumberId(val value: Int)