import * as React from 'react';
import {createStore, Action} from '../context/Context';
import {Board} from '../types/Boards';

enum BoardsActions {
    SET_BOARDS = 'SET_BOARDS',
    SET_CURRENT_BOARD = 'SET_CURRENT_BOARD',
}

interface State {
    boards: Board[];
    currentBoard: Board;
}

const initialState: State = {
    boards: [],
    currentBoard: null,
};

const boardsReducer = (state: State, action: Action<BoardsActions>) => {
    switch (action.type) {
        case BoardsActions.SET_BOARDS: {
            const {boards}:{boards: Board[]} = action.payload;
            return {
                ...state,
                ...{boards},
            };
        }
        case BoardsActions.SET_CURRENT_BOARD: {
            return {
                ...state,
                ...{currentBoard: action.payload.currentBoard},
            };
        }
    }
};

const [BoardsProvider, useBoards] = createStore<State, BoardsActions>(
    boardsReducer,
    initialState
);

export {BoardsActions, BoardsProvider, useBoards};
