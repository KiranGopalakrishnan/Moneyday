package com.projector.rates.repository

import com.mongodb.client.model.Filters
import com.projector.common.modals.Id
import com.projector.common.modals.NumberId
import com.projector.common.mongo.CollectionFactory
import com.projector.common.mongo.EntityCollection
import com.projector.rates.modals.User
import com.projector.rates.repository.mapper.UserDocumentMapper
import org.springframework.stereotype.Repository

@Repository
class RateRepository(val collectionFactory: CollectionFactory) {
    private val COLLECTION_NAME = "rates"

    private val entityCollection: EntityCollection<User> = collectionFactory.create(COLLECTION_NAME,UserDocumentMapper )

    fun findUser(boardId: NumberId,userId: NumberId): User? {
        return entityCollection.findOne(
                Filters.and(
                        Filters.eq(
                                RateDocument.USER_ID.key,userId.value),
                Filters.eq(
                        RateDocument.BOARD_ID.key,boardId.value
                )
                )
        )
    }

    fun save(user: User) {
        entityCollection.save(user)
    }

    fun getAllRatesForBoard(boardId: NumberId): List<User>? {
        return entityCollection.findAll(Filters.eq(RateDocument.BOARD_ID.key,boardId.value));
    }
}