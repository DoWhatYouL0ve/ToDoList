import React, {ChangeEvent} from "react";
import {FiltersValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
                <IconButton aria-label="delete" onClick={removeToDoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map( t => {
                        //так как каждая li имеет свою кнопку удаления, то не выносим эту функцию за рамки создания li
                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus( props.id, t.id,  e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id)
                        }

                        return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox onChange={onChangeStatusHandler} checked={t.isDone}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.filter === "active" ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.filter === "completed" ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
}

