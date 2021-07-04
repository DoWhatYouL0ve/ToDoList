import axios from 'axios'

const instance = axios.create( {
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": '4ecc4fdb-da6b-45f9-bb99-93bccea55cd4'
    }
})


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistAPI = {
    getTodolist() {
        return instance.get< Array<TodolistType> >(`todo-lists`)
    },

    createTodolist( title: string ) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
    },

    updateTodolist( todolistId: string, title: string ) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },

    deleteTodolist( todolistId: string ) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    //tasks

    getTasks( todolistId: string ) {
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },

    deleteTasks( todolistId: string, taskId: string ) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },

    createTasks( todolistId: string, taskTitle: string ) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title:taskTitle})
    },
    updateTasks( todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

