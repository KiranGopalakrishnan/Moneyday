import {post} from '../api/Api';
import {projectorUrl} from './utils';
import { Monday } from '../common/ecosystem/Monday';
const getUser = (id: string) => {
    return new Monday().api(`query { users (ids: ${id}) { name url photo_tiny } }`);
};

export {getUser};
