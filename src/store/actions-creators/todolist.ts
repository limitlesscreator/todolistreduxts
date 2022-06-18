import {TodolistAction, TodolistActionTypes} from "../../types/todo";
import {Dispatch} from "redux";
import {useTypesSelector} from "../../hooks/useTypedSelector";



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
                done: false,
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

export const changeTaskStarred = (todolists:any, id: string, value: boolean) :any => {

    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            dispatch({type: TodolistActionTypes.SET_LOADING_TRUE})
            const ourLocalObj = todolists.find((el:any) => el._id === id)
            console.log(ourLocalObj)
            const obj = {
                id: ourLocalObj._id,
                title: ourLocalObj.title,
                starred: value,
                done: ourLocalObj.done,
                editMode: ourLocalObj.editMode,
                date: ourLocalObj.date
            }

            const req = await fetch('https://servertodolistdb.herokuapp.com/API/updtodo',{
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(obj)
                })
            console.log(obj)
            console.log(req)
            // dispatch({type: TodolistActionTypes.FETCH_TODOLISTS})
            const req2 = await fetch('https://servertodolistdb.herokuapp.com/API/GETtodos')
            const response = await req2.json()
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты

        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при смене статуса'})
        }
    }
};

export const PutTodolist = (title:string, todolists: any, id: string) :any => {

    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            dispatch({type: TodolistActionTypes.SET_LOADING_TRUE})
            const ourLocalObj = todolists.find((el:any) => el._id === id)

            const obj = {
                id: ourLocalObj._id,
                title: title,
                starred: ourLocalObj.starred,
                done: ourLocalObj.done,
                editMode: ourLocalObj.editMode,
                date: ourLocalObj.date
            }

            const req = await fetch('https://servertodolistdb.herokuapp.com/API/updtodo',{
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(obj)
                })
            console.log(obj)
            console.log(req)
            // dispatch({type: TodolistActionTypes.FETCH_TODOLISTS})
            const req2 = await fetch('https://servertodolistdb.herokuapp.com/API/GETtodos')
            const response = await req2.json()
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты

        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при смене данных задачи'})
        }
    }
};

export const DeleteTask = (id: string) :any => {
    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            dispatch({type: TodolistActionTypes.SET_LOADING_TRUE})
           await fetch(`https://servertodolistdb.herokuapp.com/API/deltodo/${id}`,{
                    method: 'DELETE',
                })
            const req2 = await fetch('https://servertodolistdb.herokuapp.com/API/GETtodos')
            const response = await req2.json()
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты (перерисовка после удаления)
            dispatch({type: TodolistActionTypes.DELETE_TASK_SUCCESS})

        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при удалении задачи'})
        }
    }
};


export const ChangeDoneTodo = (done: boolean, todolists: any, id: string) :any => {

    return async (dispatch: Dispatch<TodolistAction>) =>  {
        try {
            dispatch({type: TodolistActionTypes.SET_LOADING_TRUE})
            const ourLocalObj = todolists.find((el:any) => el._id === id)

            const obj = {
                id: ourLocalObj._id,
                title: ourLocalObj.title,
                starred: ourLocalObj.starred,
                done: done,
                editMode: ourLocalObj.editMode,
                date: ourLocalObj.date
            }

            const req = await fetch('https://servertodolistdb.herokuapp.com/API/updtodo',{
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
            console.log(obj)
            console.log(req)
            // dispatch({type: TodolistActionTypes.FETCH_TODOLISTS})
            const req2 = await fetch('https://servertodolistdb.herokuapp.com/API/GETtodos')
            const response = await req2.json()
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_SUCCESS, payload: response}) // запрос на тудулисты

        } catch (e) {
            dispatch({type: TodolistActionTypes.FETCH_TODOLISTS_ERROR, payload: 'Произошла ошибка при смене стутса задачи'})
        }
    }
};



