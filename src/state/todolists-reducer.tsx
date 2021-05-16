import {FiltersValueType, ToDoListType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FiltersValueType
    id: string
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, id: v1()}
}

export const changeTodolistTitleAC = (title:string, id: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}

export const changeTodolistFilterAC = (filter:FiltersValueType, id: string): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
}

export let toDoList1 = v1()
export let toDoList2 = v1()

const initialState: Array<ToDoListType> = [
    {id: toDoList1, title: 'What to learn', filter: 'all'},
    {id: toDoList2, title: 'What to buy', filter: 'all'}
]

// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<ToDoListType> = initialState, action: ActionType):Array<ToDoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return  state.filter(td => td.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [ {
                id: action.id,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }
}
