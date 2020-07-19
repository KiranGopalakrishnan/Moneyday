import { Monday } from '../Monday/Monday'
import { saveTimeRecords } from './TimeRecordsRepository'
import { v4 as uuidv4 } from 'uuid'
import { Board } from '../types/Boards'
import { TimeRecord, TimeRecordDocument } from '../types/TimeRecord'
import { ActivityLog, ActivityLogData } from '../types/ActivityLog'
import { PersonsAndTeamsDocument } from '../types/PersonsAndTeams'
import { addDays, eachDayOfInterval, isSameDay, startOfDay, subDays } from 'date-fns'

const getTimeTrackingActivityLog = (columnId: string, boardId: string) => {
    return new Monday()
        .api(
            `query {
  boards(ids: ${boardId}) {
    activity_logs(column_ids: [${columnId}]) {
      event
      data
      user_id
      id
    }
  }
}`
        )
        .then(({ boards }: { boards: Board<any>[] }) => boards[0].activity_logs)
        .catch(console.error)
}

const parseTimeTrackingColumnActivity = (activityLogs: ActivityLog[]) => {
    const logData: ActivityLogData<TimeRecord>[] = activityLogs.map(
        (log: ActivityLog) => ({
            ...JSON.parse(log.data),
            ...{ id: log.id, user_id: log.user_id },
        })
    )
    return logData
        .map((data) =>
            data.value?.duration
                ? {
                      duration: data.value?.duration,
                      started_at: data.value?.startDate,
                      ended_at:
                          (data.value?.startDate ? data.value?.startDate : 0) +
                          (data.value?.duration ?? 0),
                      board_id: data.board_id,
                      column_id: data.column_id,
                      task_id: data.pulse_id,
                      id: data.id,
                      user_id: Number(data.user_id),
                  }
                : null
        )
        .filter(Boolean)
}

const splitTimeRecordsByDate = (timeRecords:{
    duration: number;
    started_at: number;
    ended_at: number;
    board_id: number;
    column_id: string;
    task_id: number;
    id: string;
    user_id: number;
}[]) => {
    const timerecordsByDate =  timeRecords.map(record => {
        const start = new Date(record.started_at * 1000);
        const end = new Date(record.ended_at * 1000);
        if(isSameDay(start,end)){
            return [{...record,...{timerecord_date:startOfDay(start).getTime()}}];
        }
        const nextDayOfStart = addDays(start, 1)
        nextDayOfStart.setHours(0, 0, 0, 0)
        const endDay = new Date(end)
        endDay.setHours(0, 0, 0, 0)
        const allDatesWithinRange = eachDayOfInterval({start,end});
        const startDayTimeSpent =
            nextDayOfStart.getTime() / 1000 - start.getTime() / 1000
        const endDateTimeSpent = end.getTime() / 1000 - endDay.getTime() / 1000
        allDatesWithinRange.shift()
        allDatesWithinRange.pop()
        const dateRangeTimerecords = allDatesWithinRange.map((date) => ({
            ...record,
            ...{ timerecord_date: date.getTime(), duration: 24 * 3600 },
        }))
        const startDayTimerecord = {
            ...record,
            ...{
                timerecord_date: start.getTime(),
                duration: startDayTimeSpent,
            },
        }
        const endDayTimerecord = {
            ...record,
            ...{
                timerecord_date: end.getTime(),
                duration: endDateTimeSpent,
            },
        }
        return [startDayTimerecord, ...dateRangeTimerecords, endDayTimerecord]
    })

    return timerecordsByDate.flatMap(records => records );
}

const addTimeRecordsForBoard = (
    columnId: string,
    boardId: string
): Promise<TimeRecordDocument[]> =>
    getTimeTrackingActivityLog(columnId, boardId)
        .then(parseTimeTrackingColumnActivity)
        .then(splitTimeRecordsByDate)
        .then(saveTimeRecords)
        .catch(console.error)

export { addTimeRecordsForBoard }
