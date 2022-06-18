import {TodolistActionTypes, TodolistState} from "../types/todo";
import {todolistReducer} from "../store/reducers/todolistReducer";


let state: TodolistState

beforeEach(() => {
    state = {
        todolists: [  {
            _id:"62a6eb653a31ed3d432bd8a4",
            title:"Task 3",
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
})

test('Меняем экран загрузки в true', () => {
    const newState = todolistReducer(state, {type: TodolistActionTypes.SET_LOADING_TRUE})

    expect(newState.loading).toBeTruthy()
})

test('Меняем экран загрузки в false после удаления таски', () => {
    const newState = todolistReducer(state, {type: TodolistActionTypes.DELETE_TASK_SUCCESS})

    expect(newState.loading).toBeFalsy()
})

test('Изменить titleElement в reduce на текущий (значение с инпута)', () => {
    const newState = todolistReducer(state, {type: TodolistActionTypes.SET_TITLE_ELEMENT, payload: 'Task 4'})

    expect(newState.titleElement).toBe('Task 4')
})