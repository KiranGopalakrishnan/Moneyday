import * as React from 'react';
import {createStore, Action} from '../context/Context';
import {Board, CostPerDay, CostSummary} from '../types';

enum CurrentBoardActions {
    SET_CURRENT_BOARD = 'SET_CURRENT_BOARD',
    IS_TRACKING_BOARD= 'IS_TRACKING_BOARD',
    SET_COST_SUMMARY = 'SET_COST_SUMMARY',
    SET_MULTIPLE = 'SET_MULTIPLE',
}

interface State {
    currentBoard: Board;
    costSummary: CostSummary;
    costPerDay: CostPerDay[];
}

const initialState: State = {
    currentBoard: null,
    costSummary: null,
    costPerDay: [],
};

const boardsReducer = (state: State, action: Action<CurrentBoardActions>) => {
    switch (action.type) {
        case CurrentBoardActions.SET_CURRENT_BOARD: {
            return {
                ...state,
                ...{currentBoard: action.payload.currentBoard},
            };
        }
        case CurrentBoardActions.SET_COST_SUMMARY: {
            return {
                ...state,
                ...{costSummary: action.payload.costSummary},
            };
        }
        case CurrentBoardActions.IS_TRACKING_BOARD: {
            const {isTracking} = action.payload.currentBoard;
            return {
                ...state,
                ...{currentBoard: {...state.currentBoard, ...{isTracking}}},
            };
        }
        case CurrentBoardActions.SET_MULTIPLE: {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
};

const [BoardsProvider, useCurrentBoard] = createStore<State, CurrentBoardActions>(
    boardsReducer,
    initialState
);

export {CurrentBoardActions, BoardsProvider, useCurrentBoard};
