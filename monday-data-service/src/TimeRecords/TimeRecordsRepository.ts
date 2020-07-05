import { Mongo } from '../Mongo/Mongo'

const COLLECTION_NAME = 'timerecords'

const saveTimeRecords = async (timeRecord: any) => {
    const client = await await Mongo.connect()
    const collection = await client.db().collection(COLLECTION_NAME)
    return await collection.insertMany(timeRecord)
}

export { saveTimeRecords }
