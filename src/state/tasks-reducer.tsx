import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, toDoList1, toDoList2} from "./todolists-reducer";

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistID: string
    taskID: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    taskID: string
    title: string
}

const initialState: TaskStateType = {
    [toDoList1]: [
        {id: v1(), title: "HTML/CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    [toDoList2]: [
        {id: v1(), title: "Book", isDone: true},
        {id: v1(), title: "Monitor", isDone: true},
        {id: v1(), title: "Adapter", isDone: false},
    ]
}

// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TaskStateType = initialState, action: ActionType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            let task = state[action.todolistID]
            let filtered = task.filter(t => t.id !== action.taskID)
            stateCopy[action.todolistID] = filtered
            return stateCopy
        }
        case 'ADD-TASK': {
            debugger
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            const newTask = {id: v1(), title: action.title, isDone: false}
            let newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            debugger
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            let task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistID]
            let task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.id] = []
            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistID, taskID, isDone}
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistID, taskID, title}
}