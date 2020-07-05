import {post} from '../api/Api';
import {projectorUrl} from './utils';
import {Board} from '../types/Boards';
import { Monday } from '../common/ecosystem/Monday';

const getAllBoards = () => {
    return new Monday().api(`query { boards { id, name, owner {
id name photo_tiny
} } }`);
};


const getAllColumnsForBoard = (boardId: string) => {
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

const getAllTimeRecords = (boardId: string) =>
    new Monday().api(`{
  items {
    column_values(ids: "time_tracking") {
      id
      value
      additional_info
    }
  }
}
`);
export {getAllBoards, getAllColumnsForBoard, getAllTimeRecords};
