import {
    PersonColumnValue,
    PersonsAndTeams,
    PersonsAndTeamsDocument,
} from '../types/PersonsAndTeams'
import { ActivityLog, ActivityLogData } from '../types/ActivityLog'
import { Board } from '../types/Boards'
import { Monday } from '../Monday/Monday'
import { savePersonsAndTeamLogs } from './PersonsAndTeamsRepository'
import { v4 as uuidv4 } from 'uuid'

const getPersonColumnActivityLog = (
    columnId: string,
    boardId: string
): Promise<ActivityLog[]> => {
    return new Monday()
        .api(
            `query {
  boards(ids: ${boardId}) {
    activity_logs(column_ids: [${columnId}]) {
      event
      data
    }
  }
}
`
        )
        .then(({ boards }: { boards: Board<any>[] }) => boards[0].activity_logs)
        .catch(console.error)
}

const parsePersonColumnActivity = (
    activityLogs: ActivityLog[]
): PersonsAndTeamsDocument[] => {
    const logData: ActivityLogData<
        PersonColumnValue
    >[] = activityLogs.map((log: ActivityLog) => JSON.parse(log.data))
    return logData.map((data) => ({
        from: data.previous_value?.personsAndTeams ?? [],
        to: data.value?.personsAndTeams ?? [],
        started_at: data.previous_value?.changed_at
            ? new Date(data.previous_value.changed_at).getTime()
            : null,
        ended_at: data.value?.changed_at
            ? new Date(data.value.changed_at).getTime()
            : null,
        board_id: data.board_id,
        column_id: data.column_id,
        task_id: data.pulse_id,
        id: uuidv4(),
    }))
}

const addPersonsAndTeamsRecordsForBoard = (
    columnId: string,
    boardId: string
): Promise<any> =>
    getPersonColumnActivityLog(columnId, boardId)
        .then(parsePersonColumnActivity)
        .then(savePersonsAndTeamLogs)
        .catch(console.error)

export { addPersonsAndTeamsRecordsForBoard }
