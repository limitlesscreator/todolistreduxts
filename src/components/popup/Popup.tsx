import React from 'react';
import s from './Popup.module.css'
import {useDispatch} from "react-redux";
import {TodolistActionTypes} from "../../types/todo";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {changeTaskStarred} from "../../store/actions-creators/todolist";





export const Popup = () => {
    const dispatch = useDispatch()
    const {todolists,showMenu} = useTypesSelector(state => state.todoList)

    const changeStarred = async (id: string, value: boolean) => {
        dispatch(changeTaskStarred(todolists,id,value))
    }

    const closeModal = async () => {
        dispatch({type: TodolistActionTypes.SET_SHOW_MENU, payload: {showing: false, id: ""}})
    }

    const modifyTitleText = async () => {
        closeModal()
        dispatch({type: TodolistActionTypes.MODIFYING_TITLE, payload: {editMode: true, id: showMenu.id} })

    }
    return (
        <div className={s.modal}>
            <button onClick={closeModal}>close</button>
            <div className={s.text}>
                <div>
                    <button onClick={() => changeStarred(showMenu.id, true)}>Избранное</button>
                    <button onClick={() => changeStarred(showMenu.id, false)}>Убрать из избранного</button>
                </div>
                <div>
                    <button>Выполнено</button>
                    <button>Вернуть в работу</button>
                </div>
                <div>
                    <button onClick={modifyTitleText}>Редактировать</button>
                    <button>Удалить</button>
                </div>
            </div>
        </div>
    );
};
