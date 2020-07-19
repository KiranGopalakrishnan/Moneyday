import { ActivityLog } from './ActivityLog'

interface Item<T> {
    id: string
    name: string
    column_values: T[]
}

interface Board<T> {
    name: string
    items: Item<T>[]
    activity_logs: ActivityLog[]
}

export { Board, Item }
