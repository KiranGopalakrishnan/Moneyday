package com.projector.common.mongo

import com.mongodb.client.model.Filters
import org.bson.Document
import org.bson.conversions.Bson
import org.springframework.stereotype.Component
import java.util.*

@Component
interface EntityCollection<T> {

    public fun save(domain: T): Unit

    public fun findOne(filter: Bson):T?

    public fun findAll(): List<T>?

    public fun findAll(filter: Bson): List<T>?

}