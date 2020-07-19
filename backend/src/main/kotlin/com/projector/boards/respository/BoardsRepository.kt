package com.projector.boards.respository

import com.mongodb.client.model.Filters
import com.projector.boards.modals.Board
import com.projector.boards.respository.mapper.BoardsDocumentMapper
import com.projector.common.modals.NumberId
import com.projector.common.mongo.CollectionFactory
import com.projector.common.mongo.EntityCollection
import org.springframework.stereotype.Repository

@Repository
class BoardsRepository(val collectionFactory: CollectionFactory) {

    companion object{
        val COLLECTION_NAME = "boards"
    }

    private val entityCollection: EntityCollection<Board> = collectionFactory.create(COLLECTION_NAME, BoardsDocumentMapper)

    fun save(board: Board) {
        entityCollection.save(board)
    }


    fun getBoardById(id: NumberId): Board? {
        return entityCollection.findOne (Filters.eq(BoardDocument.BOARD_ID.key,id.value))
    }



}