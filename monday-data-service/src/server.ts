import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express, { Request, Response } from 'express'
import { Mongo } from './Mongo/Mongo'
import { addTimeRecordsForBoard } from './TimeRecords/TimeRecordService'

const app = express()

Mongo.connect()

app.use(helmet())

app.use(bodyParser.json())

app.use(cors())

app.use(morgan('combined'))

app.get('/import', async (req: Request, res: Response) => {
    const timeRecords = await addTimeRecordsForBoard(
        'time_tracking',
        '631815140'
    )
    res.send(timeRecords)
})

// starting the server
app.listen(4000, () => {
    console.log('listening on port 4000')
})
