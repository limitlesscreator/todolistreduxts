import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTypesSelector} from "../../hooks/useTypedSelector";
import {changeTaskStarred, fetchTodolists, postTodolist, PutTodolist} from "../../store/actions-creators/todolist";
import s from './todoList.module.css'
import {TodolistActionTypes} from "../../types/todo";
import {ReactComponent as MenuIcon} from "../../icon/icon.svg";
import {ReactComponent as StarIcon} from "../../icon/star.svg";
import {ReactComponent as PlusIcon} from "../../icon/plus.svg";
import {ImageComponent} from "../imageComponent/ImageComponent";


export const TodoList: React.FC = () => {
    const inputField = useRef() as React.MutableRefObject<HTMLInputElement>;
    const {todolists, error, loading, newTaskTitle, limitError, modifyingTitle, titleElement, showMenu} = useTypesSelector(state => state.todoList)
    const dispatch = useDispatch()
    const [filterTask, setFilterTask] = useState('all')
    const [isAnyFilter, setIsAnyFilter] = useState(false)
    const tempStyle = s.taskDone + " " + s.title
    const tempStyleDone = s.task + " " + s.taskDoneMain
    useEffect(() => {
        dispatch(fetchTodolists())
        console.log('works')

    }, [])

    useLayoutEffect(() => {
        if (inputField) {
            inputField?.current?.focus()
        }
    })

    if (loading) {
        return <h1 className={s.downloading}>Загрузка...</h1>
    }
    if (error) {
        return <h1>{error}</h1>
    }
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: TodolistActionTypes.NEW_TASK_TITLE, payload: event.currentTarget.value}) // change value of input
        let tempCount = -150 + event.currentTarget.value.length
        let error = tempCount > 0

        dispatch({type: TodolistActionTypes.CHANGE_LIMIT_ERROR, payload: {value: tempCount, error: error}})


    }


    const openMenu = (id: string) => {
        dispatch({type: TodolistActionTypes.SET_SHOW_MENU, payload: {showing: true, id}})
        let currObj = todolists.find(el => el._id === id)
        console.log(currObj)
        dispatch({type: TodolistActionTypes.SET_TITLE_ELEMENT, payload: currObj.title})
    }

    const addTask = async (str: string) => {
        const obj = {
            title: str,
            starred: "false",
            done: "true",
            editMode: "false",
            date: new Date()
        }
        if (limitError?.value === 0){
            dispatch(postTodolist(obj))
        }
    }


    const changeStarredToFalse = async (id: string) => {
        dispatch(changeTaskStarred(todolists, id, false)) // удаляет из избранного, главный экран
    }


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: TodolistActionTypes.SET_TITLE_ELEMENT, payload: e.currentTarget.value})
    }
    const onKeyPressHandler = (event: any) => {
        if (event.code === 'Enter') {
            // titleElement текст на который заменяем в нашей тудушке
            dispatch({type: TodolistActionTypes.MODIFYING_TITLE, payload: {editMode: false, id: showMenu.id}})
            dispatch(PutTodolist(titleElement, todolists, modifyingTitle.id))
        }
    }
    const secondOnKeyPressHandler = (event: any) => {
        if (event.code === 'Enter') {
            addTask(newTaskTitle)
        }
    }

    return (
       <div className={s.mainBlock}>
           <ImageComponent/>
           <div className={s.todoList}>
               <div className={s.inputButton}>
                   <input className={s.mainInput} type="text" value={newTaskTitle} onChange={(e) => onChangeHandler(e)} onKeyPress={(e) => secondOnKeyPressHandler(e)}/>
                   {/*<button onClick={() => {addTask(newTaskTitle)}}>add task</button>*/}
                   <PlusIcon onClick={() => addTask(newTaskTitle)}  className={s.iconMenu}/>

               </div>
               <div className={s.blockButtons}>
                   <button className={filterTask === 'done' ? s.activeStyleButton : s.notActionStyleButton} onClick={() => {
                       if(isAnyFilter && filterTask === 'done'){
                           setIsAnyFilter(false);
                           setFilterTask('all')
                       }
                       else {
                           setIsAnyFilter(true);
                           setFilterTask('done')
                       }
                   }}>Выполненные задачи</button>
                   <button className={filterTask === 'notDone' ? s.activeStyleButton : s.notActionStyleButton} onClick={() => {
                       if(isAnyFilter && filterTask === 'notDone'){
                           setIsAnyFilter(false);
                           setFilterTask('all')
                       }
                       else {
                           setIsAnyFilter(true);
                           setFilterTask('notDone')
                       }
                   }}>Задачи в работе</button>
                   <button className={filterTask === 'starred' ? s.activeStyleButton : s.notActionStyleButton} onClick={() => {
                       if(isAnyFilter && filterTask === 'starred'){
                           setIsAnyFilter(false);
                           setFilterTask('all')
                       }
                       else {
                           setIsAnyFilter(true);
                           setFilterTask('starred')
                       }
                   }}>Избранные задачи</button>
               </div>
               {limitError?.error ? <div className={s.limit}>Лимит привышен!! на {limitError.value} символа</div> : ''}


               {/*/ Обязательно сделал бы рефакторинг!! К срезу пытаюсь максимально хорошо успеть подготовиться)/*/}
               {todolists?.map(el => {
                   if(filterTask === 'all'){
                       return (
                           <div key={el._id} className={el.done ? tempStyleDone : s.task}>

                               {modifyingTitle.editMode && modifyingTitle.id === el._id ?
                                   <input className={s.secretInput} ref={inputField} type="" value={titleElement} onChange={e => inputChangeHandler(e)}
                                          onKeyPress={e => onKeyPressHandler(e)}/> :
                                   <div className={el.done ? tempStyle : s.title}>{el.title}</div>
                               }

                               {el.starred ? <StarIcon color={'red'} onClick={() => changeStarredToFalse(el._id)} className={s.starIcon}/> : ''}
                               <MenuIcon color={'red'} onClick={() => openMenu(el._id)} className={s.menuButton}/>
                           </div>
                       )
                   }
                   else if(filterTask === 'done' && el.done === true){
                       return (
                           <div key={el._id} className={el.done ? tempStyleDone : s.task}>

                               {modifyingTitle.editMode && modifyingTitle.id === el._id ?
                                   <input ref={inputField} type="" value={titleElement} onChange={e => inputChangeHandler(e)}
                                          onKeyPress={e => onKeyPressHandler(e)}/> :
                                   <div className={el.done ? tempStyle : s.title}>{el.title}</div>
                               }

                               {el.starred ? <StarIcon onClick={() => changeStarredToFalse(el._id)} className={s.starIcon}/> : ''}
                               <MenuIcon  onClick={() => openMenu(el._id)} className={s.menuButton}/>
                           </div>
                       )
                   }
                   else if(filterTask === 'notDone' && el.done === false){
                       return (
                           <div key={el._id} className={el.done ? tempStyleDone : s.task}>

                               {modifyingTitle.editMode && modifyingTitle.id === el._id ?
                                   <input ref={inputField} type="" value={titleElement} onChange={e => inputChangeHandler(e)}
                                          onKeyPress={e => onKeyPressHandler(e)}/> :
                                   <div className={el.done ? tempStyle : s.title}>{el.title}</div>
                               }

                               {el.starred ? <StarIcon onClick={() => changeStarredToFalse(el._id)} className={s.starIcon}/> : ''}
                               <MenuIcon onClick={() => openMenu(el._id)} className={s.menuButton}/>
                           </div>
                       )
                   }
                   else if(filterTask === 'starred' && el.starred === true && el.done === false){
                       return (
                           <div key={el._id} className={el.done ? tempStyleDone : s.task}>

                               {modifyingTitle.editMode && modifyingTitle.id === el._id ?
                                   <input ref={inputField} type="" value={titleElement} onChange={e => inputChangeHandler(e)}
                                          onKeyPress={e => onKeyPressHandler(e)}/> :
                                   <div className={el.done ? tempStyle : s.title}>{el.title}</div>
                               }

                               {el.starred ? <StarIcon onClick={() => changeStarredToFalse(el._id)} className={s.starIcon}/> : ''}
                               <MenuIcon onClick={() => openMenu(el._id)} className={s.menuButton}/>
                           </div>
                       )
                   }
               })}
           </div>
       </div>
    );
};
