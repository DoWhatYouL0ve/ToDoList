import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FiltersValueType} from "./App";

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
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FiltersValueType
    deleteToDoList: (todolistId: string) => void
}

export function ToDoList(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle, props.id); setNewTaskTitle('');
        }}

    const addTaskButton = () => {
        //.trim() обрезает пробелы с обоих сторон
        if (newTaskTitle.trim() === '') {
            return setError('Field is required')
        }
        props.addTask(newTaskTitle.trim(), props.id); setNewTaskTitle('')}
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeToDoList = () => {
        props.deleteToDoList(props.id)
    }

    return (
        <div>
            <h3>{props.title} <button onClick={removeToDoList}>X</button></h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTaskButton}>+</button>
                {error && <div className={'error-message'}>Field is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map( t => {
                        //так как каждая li имеет свою кнопку удаления, то не выносим эту функцию за рамки создания li
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}><input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button></li>
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