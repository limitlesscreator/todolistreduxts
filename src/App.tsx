import React from 'react';
import {TodoList} from "./components/todoList/todoList";
import {Popup} from "./components/popup/Popup";
import {useSelector} from "react-redux";
import {useTypesSelector} from "./hooks/useTypedSelector";
import {ConfirmModal} from "./components/confrmModal/ConfirmModal";

function App() {
    const {showMenu,confirmModal} = useTypesSelector(state => state.todoList)

  return (
    <div>
        {showMenu.showing ? <Popup/> : ''}
        {confirmModal ? <ConfirmModal/>: ''}
        <TodoList/>
    </div>
  );
}

export default App;
