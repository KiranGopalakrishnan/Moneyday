interface ActivityLogData<T> {
    board_id: number
    column_id: string
    pulse_id: number
    previous_value: T
    value: T
    user_id: number
    id: string
}

interface ActivityLog {
    event: string
    data: string
    id: string
    user_id: number
}

export { ActivityLog, ActivityLogData }
