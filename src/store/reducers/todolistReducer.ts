import {TodolistAction, TodolistActionTypes, TodolistState} from "../../types/todo";


const initState: TodolistState = {
    todolists: [],
    showMenu: {showing: false, id: ''},
    loading: false,
    error: null,
    newTaskTitle: '',
    limitError: {value: 0, error: false},
    idCurrentTask: '',
    modifyingTitle: {editMode: false, id: ''},
    titleElement: '',
    confirmModal: false // модалка вы уверены7
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
                ...state, loading: false, error: null, todolists: [...state.todolists, action.payload]
            }

        case TodolistActionTypes.SET_SHOW_MENU:
            return {...state, showMenu: action.payload}
        case TodolistActionTypes.SET_LOADING_TRUE:
            return {...state, loading: true}

        case TodolistActionTypes.SET_ID_CURRENT_TASK:
            return {...state, idCurrentTask: action.payload}
        case TodolistActionTypes.MODIFYING_TITLE:
            return {...state, modifyingTitle: action.payload}
        case TodolistActionTypes.SET_TITLE_ELEMENT:
            return {...state, titleElement: action.payload}
        case TodolistActionTypes.PUT_TODOLISTS_SUCCESS:
            return {...state, loading: false, todolists: [...action.payload]}
        case TodolistActionTypes.SET_CONFIRM_MODAL:
            return {...state, confirmModal: action.payload}


        case TodolistActionTypes.DELETE_TASK_SUCCESS:
            return {...state, loading: false, error: null,}


        default:
            return {...state}
    }
}