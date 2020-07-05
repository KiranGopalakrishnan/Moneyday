import { MongoClient } from 'mongodb'
import { Monday } from '../monday/Monday'
import { saveTimeRecords } from './TimeRecordsRepository'
import { v4 as uuidv4 } from 'uuid'

interface ColumnValue {
    id: string
    value: any
    text: string
}

interface TimeRecord {
    running: boolean
    duration: number //in seconds
    changed_at: string
    itemId?: string
}

interface Items {
    id: string
    name: string
    column_values: ColumnValue[]
}

interface Board {
    name: string
    items: Items[]
}

const getTimeRecordsFor = (boardId: string) => {
    return new Monday().api(`query {
  boards(ids: ${boardId}) {
    name
    items {
      id
      name
      
      column_values(ids: "time_tracking") {
        id
        value
        text
      }
    }
  }
}`)
}

const parseTimeRecords = (items: Items[], boardId: string) =>
    items
        .flatMap((item) => [
            [
                ...item.column_values,
                ...[{ item_id: item.id, id: uuidv4(), board_id: boardId }],
            ],
        ])
        .flatMap(
            ([columnValue, item]: [
                ColumnValue,
                { item_id: string; id: string; board_id: string }
            ]) => {
                if (!columnValue.value) return columnValue.value
                const parsedValue: TimeRecord = JSON.parse(columnValue.value)
                return { ...parsedValue, ...item }
            }
        )
        .filter(Boolean)

const addRecordsForBoard = (boardId: string): Promise<any> => {
    return getTimeRecordsFor(boardId)
        .then((result: { boards: Board[] }) =>
            parseTimeRecords(result.boards[0].items, boardId)
        )
        .then((timeRecords: TimeRecord[]) => saveTimeRecords(timeRecords))
        .catch(console.error)
}

export { addRecordsForBoard }
