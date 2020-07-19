import {get, post} from '../api/Api';
import {Board, BoardInfo, CostPerDay, CostSummary} from '../types';
import { Monday } from '../common/ecosystem/Monday';

const boardUrl = (id: string) => `/rest/projector/boards/${id}`;

const getAllBoards = () => {
    return new Monday().api(`query { boards { id, name, owner {
id name photo_tiny
} } }`);
};


const getAllColumnsForBoard = (boardId: number) => {
    return new Monday().api(`query {
boards (ids: ${boardId}) {
columns {
id
title
type
}
}
}`)
}

const startTracking = (boardId,boardTrackingInfo) => {
  return post<BoardInfo>(`${boardUrl(boardId)}`, boardTrackingInfo);
}

const getBoardInfo = (boardId: number) => {
  return get<BoardInfo>(`${boardUrl(boardId.toString())}`,{})
}

const getCostSummary = (boardId: number) => {
    return get<CostSummary>(`${boardUrl(boardId.toString())}/costSummary`, {});
};

const getCostPerDay = (boardId: number) => {
    return get<{costPerDay:CostPerDay[]}>(`${boardUrl(boardId.toString())}/cost-per-day`, {}).then(response => response.costPerDay );
};

export {
    getAllBoards,
    getBoardInfo,
    getAllColumnsForBoard,
    boardUrl,
    startTracking,
    getCostSummary,
    getCostPerDay,
};
