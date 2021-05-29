import React, {ChangeEvent, useCallback} from "react";
import {FiltersValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    filter: FiltersValueType
    deleteToDoList: (todolistId: string) => void
    changeToDoListTitle: (newTitle: string, todolistId: string) => void
}

export const ToDoList = React.memo((props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);
    const removeToDoList = () => {
        props.deleteToDoList(props.id)
    }
    const changeToDoListTitle = useCallback((newTitle: string) => {
        props.changeToDoListTitle(newTitle, props.id)
    }, [props.changeToDoListTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForToDoList = props.tasks

    if (props.filter === 'completed') {
        tasksForToDoList = props.tasks.filter(t => t.isDone === true);
    }
    if (props.filter === 'active') {
        tasksForToDoList = props.tasks.filter(t => t.isDone === false);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeToDoListTitle}/>
                <IconButton aria-label="delete" onClick={removeToDoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForToDoList.map(t =>
                        <Task
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            t={t}
                            id={props.id}
                            key={t.id}/>
                    )
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
})

