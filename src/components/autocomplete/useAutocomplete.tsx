import { useEffect, ChangeEvent, useReducer, useCallback } from 'react';

import names from '../../data/names.json';

type InitState = {
    text: string;
    filteredData: string[];
    userSelectedOption: boolean;
};

const initState: InitState = {
    text: '',
    filteredData: [],
    userSelectedOption: false,
};

const enum ACTION_TYPE {
    INPUT_CHANGED,
    SET_FILTERED_DATA,
    SELECT_OPTION,
}

type Action = {
    type: ACTION_TYPE;
    payload?: { data?: string[]; text?: string };
};

const reducer = (state: InitState, action: Action): InitState => {
    switch (action.type) {
        case ACTION_TYPE.INPUT_CHANGED:
            return {
                ...state,
                text: action.payload?.text ?? '',
                userSelectedOption: false,
            };
        case ACTION_TYPE.SET_FILTERED_DATA:
            return { ...state, filteredData: action.payload?.data ?? [] };
        case ACTION_TYPE.SELECT_OPTION:
            return {
                ...state,
                text: action.payload?.text ?? '',
                filteredData: [],
                userSelectedOption: true,
            };
        default:
            throw new Error('Action does not exist');
    }
};

function filterData(text: string): Promise<string[]> {
    const filterPromise = new Promise<string[]>((res, rej) => {
        try {
            const data = names.filter((name) =>
                name.toLowerCase().includes(text.toLowerCase())
            );
            res(data);
        } catch (e) {
            console.log(e);
            rej([]);
        }
    });

    return filterPromise;
}

type UseAutocompleteHookType = {
    state: InitState;
    handleOptionClick: (option: string) => void;
    handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const useAutocomplete = (): UseAutocompleteHookType => {
    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (state.userSelectedOption) return;
        if (state.text === '') {
            dispatch({
                type: ACTION_TYPE.SET_FILTERED_DATA,
                payload: { data: [] },
            });
            return;
        }

        const filter = async () => {
            const data = await filterData(state.text);
            dispatch({
                type: ACTION_TYPE.SET_FILTERED_DATA,
                payload: { data },
            });
        };
        filter();
    }, [state.text]);

    const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ACTION_TYPE.INPUT_CHANGED,
            payload: { text: e.target.value },
        });
    }, []);

    const handleOptionClick = useCallback((option: string) => {
        dispatch({
            type: ACTION_TYPE.SELECT_OPTION,
            payload: { text: option },
        });
    }, []);

    return { state, handleOptionClick, handleTextChange };
};

export default useAutocomplete;
