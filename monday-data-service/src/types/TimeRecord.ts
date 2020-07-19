interface TimeRecordColumnValue {
    id: string
    value: any
    text: string
}

interface TimeRecord {
    running: boolean
    duration: number //in seconds
    changed_at: string
    itemId?: string
    startDate?: number
}

interface TimeRecordDocument {
    duration: number
    started_at: number
    ended_at: number
    board_id: number
    column_id: string
    task_id: number
    id: string
    timeRecordForDate: number
}

export { TimeRecordColumnValue, TimeRecord, TimeRecordDocument }
