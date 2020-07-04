import {post} from '../api/Api';
import {projectorUrl} from './utils';
import {Board} from '../types/Boards';
import { Monday } from '../common/ecosystem/Monday';

const getAllBoards = () => {
    return new Monday().api(`query { boards { id, name, owner {
id name photo_tiny
} } }`);
};

export {getAllBoards};
