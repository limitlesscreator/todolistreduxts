import {TodolistAction, TodolistActionTypes, TodolistState} from "../../types/todo";


const initState: TodolistState = {
    todolists: [],
    loading: false,
    error: null,
    newTaskTitle: '',
    limitError: {value: 0, error: false}
}

export const todolistReducer = (state = initState, action: TodolistAction): TodolistState => {
    switch (action.type) {
        case TodolistActionTypes.FETCH_TODOLISTS:
            return {...state, loading: true, error: null, todolists: []}
        case TodolistActionTypes.FETCH_TODOLISTS_SUCCESS:
            return {...state, loading: false, error: null, todolists: action.payload}
        case TodolistActionTypes.FETCH_TODOLISTS_ERROR:
            return {...state, loading: false, error: action.payload, todolists: []}
        case TodolistActionTypes.NEW_TASK_TITLE:
            return {...state, newTaskTitle: action.payload}
        case TodolistActionTypes.CHANGE_LIMIT_ERROR:
            return {...state, limitError: action.payload}


        case TodolistActionTypes.POST_TODOLIST:
            return {...state, loading: true, error: null}
        case TodolistActionTypes.POST_TODOLISTS_SUCCESS:
            return {
                ...state, loading: false, error: null, todolists: [...state.todolists ,action.payload]
            }


        default:
            return {...state}
    }
}