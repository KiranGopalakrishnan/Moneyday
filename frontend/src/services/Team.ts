import { Monday } from "../common/ecosystem/Monday";


const getAllUsers = (boardId: string) => {
    return new Monday().api(`query {
boards (ids: ${boardId}) {
subscribers {
    id
    name
    photo_tiny
}
}
}`);
}

export {getAllUsers};