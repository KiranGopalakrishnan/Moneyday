import { MongoClient, MongoClientOptions } from 'mongodb'

class Mongo {
    static client: MongoClient | null

    static url: string

    static options: MongoClientOptions

    static async connect(): Promise<MongoClient> {
        if (this.client) return this.client
        this.client = await MongoClient.connect(this.url, this.options)
        return this.client
    }
}

Mongo.client = null
Mongo.url = 'mongodb://localhost:27017/projector-main'
Mongo.options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

export { Mongo }
