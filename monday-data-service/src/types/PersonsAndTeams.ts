interface PersonsAndTeams {
    id: string
    kind: string
}

interface PersonColumnValue {
    changed_at: string
    personsAndTeams: PersonsAndTeams[]
}

interface PersonsAndTeamsDocument {
    from: PersonsAndTeams[]
    to: PersonsAndTeams[]
    board_id: number
    started_at: number
    ended_at: number
    column_id: string
    task_id: number
    id: string
}

export { PersonColumnValue, PersonsAndTeams, PersonsAndTeamsDocument }
