import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('New todolist')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '903e4558-6d11-40e3-a59a-953311b227e8'
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '641084da-c38c-447f-93f1-cefc3ceddb1d'
        todolistAPI.updateTodolist(todolistId, "Valodos  New ToDoList")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')


    const getTask = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} type="text" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={getTask}>get task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>('')
    const [todolistId, setTodolistId] = useState<any>('')

    const deleteTask = () => {
        todolistAPI.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} type="text" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'taskId'} type="text" value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTasks(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} type="text" value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task Title'} type="text" value={taskTitle} onChange={(e) => {
                setTaskTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>


}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [description, setDescription] = useState<string>('some text')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistAPI.updateTasks(todolistId, taskId, {
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: taskTitle,
            deadline: '',
            completed: true
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} type="text" value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} type="text" value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <input placeholder={'task Title'} type="text" value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
            <input placeholder={'task description'} type="text" value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
            <input placeholder={'task status'} type="text" value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
            <input placeholder={'task priority'} type="text" value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
            <input placeholder={'task startDate'} type="text" value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
            <input placeholder={'task deadline'} type="text" value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
            <button onClick={updateTask}>update task</button>
        </div>
    </div>


}