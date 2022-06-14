import {combineReducers} from "redux";
import {todolistReducer} from "./todolistReducer";

export const rootReducer = combineReducers({
     todoList: todolistReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // фиксит получение данных со стейта