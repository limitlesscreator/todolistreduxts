import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {changeTaskStarred, fetchTodolists, postTodolist} from "../../store/actions-creators/todolist";
import s from './todoList.module.css'
import {TodolistActionTypes} from "../../types/todo";
import {ReactComponent as MenuIcon} from "../../icon/icon.svg";
import {ReactComponent as StarIcon} from "../../icon/star.svg";

export const TodoList: React.FC = () => {
    const {todolists, error, loading, newTaskTitle, limitError, modifyingTitle} = useTypesSelector(state => state.todoList)
    const dispatch = useDispatch()
    const tempStyle = s.taskDone + " " + s.title
    const tempStyleDone = s.task + " " + s.taskDoneMain
    const [input, setInput] = useState('') // дай знать пожалуйста, надо ли для инпута стейт в сторе или стейт через хук лучше)

    //Когда появляется инпут, до этого диспачим значение в стор (el.title)(в месте где инпут) , делается рендер снова и тогда через useEffect мы setStatим наше значение setInput(el.title)

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

    const openMenu = (id: string) => {
        dispatch({type: TodolistActionTypes.SET_SHOW_MENU, payload: {showing: true, id}})
        console.log('hi ' + id)
    }

    const addTask = async (str:string)  => {
        const obj = {
            title: str,
            starred: "false",
            done: "true",
            editMode: "false",
            date: new Date()
        }
        dispatch(postTodolist(obj))
    }


    const changeStarredToFalse = async (id: string) => {
        dispatch(changeTaskStarred(todolists,id,false)) // удаляет из избранного, главный экран
    }


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
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
                    <div key={el._id} className={el.done ? tempStyleDone : s.task}>

                        {/*//changing*/}
                        {modifyingTitle.editMode && modifyingTitle.id === el._id ?
                                <input type="" value={input} onChange={e => inputChangeHandler(e)}/>
                                // {() => setInput(el.title)}
                              :
                            // ошибка из-за setInput(el.title)
                            <div className={el.done ? tempStyle : s.title}>{el.title}</div>}
                        {/*//changing*/}


                        {el.starred ? <StarIcon onClick={() => changeStarredToFalse(el._id)} className={s.starIcon}/> : ''}
                        <MenuIcon onClick={() => openMenu(el._id)} className={s.iconMenu}/>
                        {/*<div>{`${el.starred}`}</div>*/}
                    </div>
                )
            })}
        </div>
    );
};
