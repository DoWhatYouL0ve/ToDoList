import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

let reducer = combineReducers({
    tasks: tasksReducer,
    toDoList: todolistsReducer
})

export type AppRootStateType = ReturnType<typeof reducer>

export const store = createStore(reducer)