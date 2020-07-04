package com.projector.common.http

import com.projector.common.http.beans.RestError
import java.lang.RuntimeException

class ResourceException(
        private val errorMessage: String,
        private val httpStatusCode: Int
): RuntimeException() {

    fun getExceptionMessage(): String {
        return this.errorMessage;
    }

    fun getStatusCode(): Int {
        return this.httpStatusCode;
    }

}