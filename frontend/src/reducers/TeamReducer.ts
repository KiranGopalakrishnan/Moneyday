import * as React from 'react';
import {createStore, Action} from '../context/Context';
import {Board} from '../types/Boards';
import { User } from '../types';

enum TeamActions {
    SET_USERS = 'SET_USERS',
}

interface State {
    users: User​​[];
}

const initialState: State = {
    users: [],
};

const teamReducer = (state: State, action: Action<TeamActions>) => {
    switch (action.type) {
        case TeamActions.SET_USERS: {
            const {users}: {users: User[]} = action.payload;
            return {
                ...state,
                ...{users},
            };
        }
    }
};


const [TeamProvider, useTeam] = createStore<State, TeamActions>(teamReducer, initialState);

export {TeamActions, TeamProvider, useTeam};
