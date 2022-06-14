export interface TodolistState {
    todolists: any[] ,
    loading?: boolean,
    error?: string | null,
    newTaskTitle?: string,
    limitError?: LimitError
}


type LimitError = {
    value: number,
    error: boolean
}

export enum TodolistActionTypes {
    FETCH_TODOLISTS = "FETCH_TODOLISTS",
    FETCH_TODOLISTS_ERROR = "FETCH_TODOLISTS_ERROR",
    FETCH_TODOLISTS_SUCCESS = "FETCH_TODOLISTS_SUCCESS",

    POST_TODOLIST = "POST_TODOLIST",
    POST_TODOLISTS_SUCCESS = "POST_TODOLISTS_SUCCESS",

    NEW_TASK_TITLE = "NEW_TASK_TITLE",
    CHANGE_LIMIT_ERROR = "CHANGE_LIMIT_ERROR"
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



interface PostTodolistAction {
    type: TodolistActionTypes.POST_TODOLIST,
}
interface PostTodolistSuccessAction {
    type: TodolistActionTypes.POST_TODOLISTS_SUCCESS,
    payload: any
}

export type TodolistAction = FetchTodolistsAction | FetchTodolistsErrorAction | FetchTodolistsSuccessAction | NewTaskTitleAction | ChangeLimitErrorAction | PostTodolistAction | PostTodolistSuccessAction
