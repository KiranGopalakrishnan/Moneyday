import { Mongo } from '../Mongo/Mongo'
import { TimeRecordDocument } from '../types/TimeRecord'

const COLLECTION_NAME = 'timerecords'

const saveTimeRecords = async (
    timeRecords: TimeRecordDocument[]
): Promise<TimeRecordDocument[]> => {
    const client = await await Mongo.connect()
    const collection = await client.db().collection(COLLECTION_NAME)
    await collection.insertMany(timeRecords)
    return timeRecords
}

export { saveTimeRecords }
