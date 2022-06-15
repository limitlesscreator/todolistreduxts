import React from 'react';
import {TodoList} from "./components/todoList/todoList";
import {Popup} from "./components/popup/Popup";
import {useSelector} from "react-redux";
import {useTypesSelector} from "./hooks/useTypedSelector";

function App() {
    const {showMenu} = useTypesSelector(state => state.todoList)

  return (
    <div>
        {showMenu.showing ? <Popup/> : ''}
        <TodoList/>
    </div>
  );
}

export default App;
