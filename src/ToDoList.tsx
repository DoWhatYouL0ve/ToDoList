import React, {ChangeEvent} from "react";
import {FiltersValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FiltersValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FiltersValueType
    deleteToDoList: (todolistId: string) => void
    changeToDoListTitle: (todolistId: string, newTitle: string) => void
}

export function ToDoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeToDoList = () => {
        props.deleteToDoList(props.id)
    }
    const changeToDoListTitle = (newTitle: string) => {
        props.changeToDoListTitle(props.id, newTitle)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeToDoListTitle} />
                <button onClick={removeToDoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map( t => {
                        //так как каждая li имеет свою кнопку удаления, то не выносим эту функцию за рамки создания li
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeStatusHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

