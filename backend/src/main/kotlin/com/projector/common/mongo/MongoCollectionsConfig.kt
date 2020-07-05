package com.projector.common.mongo

import com.mongodb.client.model.Indexes
import com.projector.timerecords.repository.TimeRecordDocument
import com.projector.timerecords.repository.TimeRecordsRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.DependsOn
import org.springframework.data.domain.Sort.Direction
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.index.Index
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

    }
}