import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express, { Request, Response } from 'express'
import { Mongo } from './Mongo/Mongo'
import { addRecordsForBoard } from './TimeRecords/TimeRecordService'
// defining the Express app
const app = express()

Mongo.connect()

app.use(helmet())

app.use(bodyParser.json())

app.use(cors())

app.use(morgan('combined'))

app.get('/timerecords', async (req: Request, res: Response) => {
    const a = await addRecordsForBoard('631815140')
    res.send(a)
})

// starting the server
app.listen(4000, () => {
    console.log('listening on port 4000')
})
