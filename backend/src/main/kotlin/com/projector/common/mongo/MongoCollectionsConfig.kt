package com.projector.common.mongo

import com.mongodb.client.model.IndexOptions
import com.mongodb.client.model.Indexes
import com.projector.boards.respository.BoardDocument
import com.projector.boards.respository.BoardsRepository
import com.projector.timerecords.repository.TimeRecordDocument
import com.projector.timerecords.repository.TimeRecordsRepository
import org.springframework.context.annotation.Configuration
import javax.annotation.PostConstruct


@Configuration
class MongoCollectionsConfig(
        private val mongoConfig:MongoConfig
) {

    @PostConstruct
    fun initIndexes() {
        val db = mongoConfig.getDatabase()
        val timeRecordCollection = db.getCollection(TimeRecordsRepository.COLLECTION_NAME)
        timeRecordCollection.createIndex(
                        Indexes.compoundIndex(
                                Indexes.ascending(TimeRecordDocument.BOARD_ID.key),
                                Indexes.ascending(TimeRecordDocument.ITEM_ID.key)
                        )
                )
        timeRecordCollection.createIndex(
                Indexes.ascending(TimeRecordDocument.BOARD_ID.key)

        )

        val boardsCollection = db.getCollection(BoardsRepository.COLLECTION_NAME)
        boardsCollection.createIndex(Indexes.ascending(BoardDocument.BOARD_ID.key), IndexOptions().unique(true))

    }
}