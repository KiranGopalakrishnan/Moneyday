package com.projector.common.mongo

import com.mongodb.MongoWriteException
import com.mongodb.client.FindIterable
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import com.mongodb.client.model.Filters
import com.mongodb.client.model.InsertOneOptions
import com.mongodb.client.model.ReplaceOptions
import com.mongodb.client.model.UpdateOptions
import org.bson.Document
import org.bson.conversions.Bson
import org.springframework.stereotype.Component
import java.util.*

public class EntityCollectionImpl<T>(private val collectionName:String,private val db: MongoDatabase,private val mapper: DocumentMapper<T>) : EntityCollection<T> {

    override fun save(domain: T):Unit {
        try {
            val document = mapper.toDocument(domain);
            //TODO: Remove this hardcoded id string ,and possibly pass in document enum class to EntityCollection ? Maybe ?
            this.db.getCollection(this.collectionName).replaceOne(Filters.eq("id",document.getString("id")),document, ReplaceOptions().upsert(true))
        }catch (exception:MongoWriteException){
            throw exception;
        }
    }

    override fun findOne(filter: Bson): T? {
        val result =  this.db.getCollection(this.collectionName).find(filter).firstOrNull()
        return result?.let { mapper.fromDocument(it) }
    }

    override fun findAll(): List<T>? {
        var result = this.db.getCollection(this.collectionName).find();
        return result?.let { it -> it.toList().map { document -> mapper.fromDocument(document) } }
    }

    override fun findAll(filter: Bson): List<T>? {
        var result =  this.db.getCollection(this.collectionName).find(filter);
        return result?.let { it -> it.toList().map { document -> mapper.fromDocument(document) } }
    }


}