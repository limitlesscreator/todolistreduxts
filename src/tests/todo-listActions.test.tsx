import {todolistReducer} from "../store/reducers/todolistReducer";
import {
    changeTaskStarred,
    DeleteTask,
    fetchTodolists,
    postTodolist,
    PutTodolist
} from "../store/actions-creators/todolist";
import {Provider, useDispatch,} from "react-redux";
import {createStore} from "redux";
import {render} from "@testing-library/react";
import {TodolistState} from "../types/todo";


test("Диспатч сработает 2 раза при успешном изминении тудулиста", () => {
    const state: TodolistState = {
        todolists: [
            {
                _id:"62a6eb653a31ed3d432bd8aa",
                title:"Task 1",
                starred:true,
                done:false,
                editMode:false,
                date:"2020-06-05",},
            {
                _id:"62a6eb653a31ed3d432bd8a3",
                title:"Task 2",
                starred:true,
                done:false,
                editMode:false,
                date:"2020-06-05",}

        ],
        showMenu: {showing: false, id: ''},
        loading: false,
        error: null,
        newTaskTitle: '',
        limitError: {value: 0, error: false},
        idCurrentTask: '',
        modifyingTitle: {editMode: false, id: ''},
        titleElement: '',
        confirmModal: false
    }


    const thunk = PutTodolist('Task 1 changed',[state.todolists], '62a6eb653a31ed3d432bd8aa')
    const dispatchMock = jest.fn()

    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(2)
})

test("Диспатч сработает 3 раза при успешном удалении задачи с тудулиста", async () => {

    const thunk = await DeleteTask('random id')
    const dispatchMock = await jest.fn()

    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})