import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {todolistReducer} from "./reducers/todolistReducer";
import {rootReducer} from "./reducers";

// вот эта штука мне понадобилась, чтобы без ошибок подключить Redux DevTools)
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnchancer(applyMiddleware(thunk)));