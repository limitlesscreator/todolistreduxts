import React from 'react';
import s from './ConfirmModal.module.css'
import {useDispatch} from "react-redux";
import {TodolistActionTypes} from "../../types/todo";
import {DeleteTask} from "../../store/actions-creators/todolist";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {ReactComponent as CloseIcon} from "../../icon/close.svg";

export const ConfirmModal = () => {
    const dispatch = useDispatch()
    const {showMenu} = useTypesSelector(state => state.todoList)

    const closeConfirmModal = () => {
        dispatch({type: TodolistActionTypes.SET_CONFIRM_MODAL, payload: false})
    }
    const deleteTask = () => {
        dispatch(DeleteTask(showMenu.id))
        dispatch({type: TodolistActionTypes.SET_CONFIRM_MODAL, payload: false})
        dispatch({type: TodolistActionTypes.SET_SHOW_MENU, payload: {showing: false, id: ""}})
    }
    return (
        <div className={s.modal}>

            <div className={s.text}>
                <div className={s.positionBlock}>
                    <CloseIcon className={s.closeIcon} onClick={closeConfirmModal}/>
                </div>
                <div className={s.title}>Вы действительно хотите удалить задачу?</div>
                <div className={s.blockButtons}>
                    <button className={s.cancelButton} onClick={closeConfirmModal}>Отмена</button><button onClick={deleteTask}>Да, удалить!</button>
                </div>
            </div>
        </div>
    );
};
