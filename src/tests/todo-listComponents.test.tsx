import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import {render, screen} from "@testing-library/react";
import React from "react";
import {TodoList} from "../components/todoList/todoList";
let state: any;
const mockStore = configureStore();
let store;


// Тут я пытался отрисовать и проверить её наличие, но оно чего-то не работает, если у тебя будет время, подскажи пожалуйста, в чём тут проблема?:)
beforeEach(()=> {
    state = [
       {
            _id: 0, title: "task 1", starred: false, done: false, editMode: null, date: "09-15-22"
        },
            {
                _id: 1, title: "task 2", starred: true, done: true, editMode: null, date: "09-15-22"
            },
            {
                _id: 2, title: "task 3", starred: false, done: false, editMode: null, date: "09-15-22"
            }
    ];
});

test('Отрисовалась ли наша таска', () => {
    store = mockStore(state);
    render(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );

    expect(screen.getByText('task 1')).toBeInTheDocument()
});