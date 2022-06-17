import React from 'react';
import s from './Popup.module.css'
import {useDispatch} from "react-redux";
import {TodolistActionTypes} from "../../types/todo";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {ChangeDoneTodo, changeTaskStarred} from "../../store/actions-creators/todolist";
import {ReactComponent as CloseIcon} from "../../icon/close.svg";





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

    const showConfirmModal = () => {
        dispatch({type: TodolistActionTypes.SET_CONFIRM_MODAL, payload: true})
    }

    const changeStatusTodo = (done: boolean) => {
        dispatch(ChangeDoneTodo(done,todolists,showMenu.id))
    }

    return (
        <div className={s.modal}>

            <div className={s.text}>
                <div className={s.positionBlock}>
                    <CloseIcon className={s.closeIcon} onClick={closeModal}/>
                </div>
                <div className={s.flexBlock}>
                    <div className={s.blockOfButtons}>
                        <button onClick={() => changeStarred(showMenu.id, true)}>Избранное</button>
                        <button onClick={() => changeStarred(showMenu.id, false)}>Убрать из избранного</button>
                    </div>
                    <div className={s.blockOfButtons}>
                        <button onClick={() => changeStatusTodo(true)}>Выполнено</button>
                        <button onClick={() => changeStatusTodo(false)}>Вернуть в работу</button>
                    </div>
                    <div className={s.blockOfButtons}>
                        <button onClick={modifyTitleText}>Редактировать</button>
                        <button onClick={showConfirmModal}>Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
