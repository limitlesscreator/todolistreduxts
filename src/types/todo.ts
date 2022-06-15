export interface TodolistState {
    todolists: any[],
    loading?: boolean,
    error?: string | null,
    newTaskTitle: string,
    limitError?: LimitError
    showMenu: ShowMenu,
    idCurrentTask: string,
    modifyingTitle: ModifyingTitle,
    children?: any;
}

type ModifyingTitle = {
    editMode: boolean,
    id: string
}

type LimitError = {
    value: number,
    error: boolean
}
type ShowMenu = {
    showing: boolean,
    id: string
}

export enum TodolistActionTypes {
    FETCH_TODOLISTS = "FETCH_TODOLISTS",
    FETCH_TODOLISTS_ERROR = "FETCH_TODOLISTS_ERROR",
    FETCH_TODOLISTS_SUCCESS = "FETCH_TODOLISTS_SUCCESS",

    POST_TODOLIST = "POST_TODOLIST",
    POST_TODOLISTS_SUCCESS = "POST_TODOLISTS_SUCCESS",


    NEW_TASK_TITLE = "NEW_TASK_TITLE",
    CHANGE_LIMIT_ERROR = "CHANGE_LIMIT_ERROR",
    SET_SHOW_MENU = "SET_SHOW_MENU",
    SET_LOADING_TRUE = "SET_LOADING_TRUE",
    SET_ID_CURRENT_TASK = "SET_ID_CURRENT_TASK",

    CHANGE_STAR_TO_FALSE_SUCCESS = "CHANGE_STAR_TO_FALSE_SUCCESS",
    MODIFYING_TITLE = "MODIFYING_TITLE",

}

interface FetchTodolistsAction {
    type: TodolistActionTypes.FETCH_TODOLISTS
}

interface FetchTodolistsSuccessAction {
    type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS
    payload: any[] // массив тутудилстов
}

interface FetchTodolistsErrorAction {
    type: TodolistActionTypes.FETCH_TODOLISTS_ERROR
    payload: string // сообщение об ошибке
}

interface NewTaskTitleAction {
    type: TodolistActionTypes.NEW_TASK_TITLE
    payload: string // сообщение об ошибке
}

interface ChangeLimitErrorAction {
    type: TodolistActionTypes.CHANGE_LIMIT_ERROR
    payload: LimitError // Объект с полем кол-вом превышенного лимита
}

interface SetShowMenu {
    type: TodolistActionTypes.SET_SHOW_MENU,
    payload: ShowMenu
}

interface SetLoadingTrue {
    type: TodolistActionTypes.SET_LOADING_TRUE
}

interface PostTodolistAction {
    type: TodolistActionTypes.POST_TODOLIST,
}

interface PostTodolistSuccessAction {
    type: TodolistActionTypes.POST_TODOLISTS_SUCCESS,
    payload: any
}

interface SetIdCurrentTask {
    type: TodolistActionTypes.SET_ID_CURRENT_TASK,
    payload: string
}

interface changeStarToFalse {
    type: TodolistActionTypes.CHANGE_STAR_TO_FALSE_SUCCESS,
    payload: any
}

interface ModifyingTitleAction {
    type: TodolistActionTypes.MODIFYING_TITLE,
    payload: ModifyingTitle
}

export type TodolistAction =
    SetIdCurrentTask
    | FetchTodolistsAction
    | FetchTodolistsErrorAction
    | FetchTodolistsSuccessAction
    | NewTaskTitleAction
    | ChangeLimitErrorAction
    | PostTodolistAction
    | PostTodolistSuccessAction
    | SetShowMenu
    | SetLoadingTrue
    | changeStarToFalse
    | ModifyingTitleAction
