import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {fetchTodolists, postTodolist} from "../../store/actions-creators/todolist";
import s from './todoList.module.css'
import {TodolistActionTypes} from "../../types/todo";
import {ReactComponent as MenuIcon} from "../../icon/icon.svg";

export const TodoList: React.FC = () => {
    const {todolists, error, loading, newTaskTitle, limitError} = useTypesSelector(state => state.todoList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    },[])

    if (loading){
        return <h1>Загрузка...</h1>
    }
    if (error){
        return <h1>{error}</h1>
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: TodolistActionTypes.NEW_TASK_TITLE, payload: e.currentTarget.value}) // change value of input
        let tempCount = -150 + e.currentTarget.value.length
        let error = tempCount > 0

        dispatch({type: TodolistActionTypes.CHANGE_LIMIT_ERROR, payload: {value:tempCount, error: error}})
    }

    const openModal = (id: string) => {
        console.log('hi ' + id)
    }

    const addTask = async (str:any)  => {
        const obj = {
            title: str,
            starred: "false",
            done: "true",
            editMode: "false",
            date: new Date()
        }
        dispatch(postTodolist(obj))

        // const res = await fetch('https://servertodolistdb.herokuapp.com/API/newtodo',{
        //     method: 'POST',
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(obj)
        // })
        // const fullRes = await res.json()
        // console.log(fullRes)

        // Добавить в состояние пришеднший объект если всё успешно


    }

    return (
        <div className={s.todoList}>
            <div className={s.inputButton}>
                <input type="text" value={newTaskTitle} onChange={(e) => onChangeHandler(e)}/>
                <button onClick={() => {addTask(newTaskTitle)}}>add task</button>
            </div>
            {limitError?.error ? <div>Лимит привышен!! на {limitError.value} символа</div> : ''}


            {todolists?.map(el => {
                return (
                    <div key={el._id} className={s.task}>
                        <div className={s.title}>{el.title}</div>
                        <MenuIcon onClick={() => openModal(el._id)} className={s.iconMenu}/>
                        {/*<div>{`${el.starred}`}</div>*/}
                    </div>
                )
            })}
        </div>
    );
};
