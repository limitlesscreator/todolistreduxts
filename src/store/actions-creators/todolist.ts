import {TodolistAction, TodolistActionTypes} from "../../types/todo";
import {Dispatch} from "redux";

export const fetchTodolists = () :any => {
    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS})
            const req = await fetch('https://servertodolistdb.herokuapp.com/API/GETtodos')
            const response = await req.json()
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты
        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при загрузке тудулистов'})
        }
    }
};

export const postTodolist = ({title, starred, done, editMode, date}:any) :any => {
    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            const obj = {
                title: title,
                starred: starred,
                done: done,
                editMode: editMode,
                date: date
            }
            console.log(obj)

            dispatch({type: TodolistActionTypes.POST_TODOLIST})
            const req = await fetch('https://servertodolistdb.herokuapp.com/API/newtodo',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
            const response = await req.json()
            dispatch({type: TodolistActionTypes.POST_TODOLISTS_SUCCESS, payload: response})
            // dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты
        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при добавлении тудулиста'})
        }
    }
};