import * as React from 'react';

type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

interface Action<T> {
    type: T;
    payload: any;
}
const createStore = <T, P>(
    reducer: (state: T, action: Action<P>) => T,
    initialState: T
): [
    React.FC<{children: React.ReactNode; initial?: Partial<T>}>,
    () => [T, ({type, payload}: {type: P; payload: RecursivePartial<T>}) => any]
] => {
    const stateContext = React.createContext(null);

    const reducerContext = React.createContext(null);

    const useDispatch = (): (() => {type: P; payload: Partial<T>}) => {
        const context = React.useContext(reducerContext);
        if (context === undefined) {
            throw new Error('dispatch must be used within a provider');
        }
        return context;
    };

    const useStateValue = () => {
        const context = React.useContext(stateContext);
        if (context === undefined) {
            throw new Error('state must be used within a provider');
        }
        return context;
    };

    const Provider: React.FC<{children: React.ReactNode; initial?: Partial<T>}> = ({
        children,
        initial,
    }: {
        children: React.ReactNode;
        initial: T;
    }) => {
        const initialValue = initial ?? initialState;
        const [state, dispatch] = React.useReducer(reducer, initialValue);

        return (
            <stateContext.Provider value={state}>
                <reducerContext.Provider value={dispatch}>{children}</reducerContext.Provider>
            </stateContext.Provider>
        );
    };

    const useState = (): [T, ({type, payload}: {type: P; payload: RecursivePartial<T>}) => any] => [
        useStateValue(),
        useDispatch(),
    ];
    return [Provider, useState];
};

export {createStore, Action};
