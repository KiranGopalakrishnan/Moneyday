import { Mongo } from '../Mongo/Mongo'
import { PersonsAndTeamsDocument } from '../types/PersonsAndTeams'

const COLLECTION_NAME = 'persons_and_teams_logs'

const savePersonsAndTeamLogs = async (
    logs: PersonsAndTeamsDocument[]
): Promise<PersonsAndTeamsDocument[]> => {
    const client = await await Mongo.connect()
    const collection = await client.db().collection(COLLECTION_NAME)
    //await collection.insertMany(logs)
    return logs
}

export { savePersonsAndTeamLogs }
