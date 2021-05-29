import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./ToDoList";

type TaskPropsType = {
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    removeTask: (id: string, todolistId: string) => void
    t: TaskType
    id: string
}

export const Task = React.memo((props: TaskPropsType) => {
    //так как каждая li имеет свою кнопку удаления, то не выносим эту функцию за рамки создания li
    const onRemoveHandler = () => props.removeTask(props.t.id, props.id);
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, props.t.id, e.currentTarget.checked)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.id, props.t.id, newValue)
    }, [props.changeTaskTitle, props.id, props.t.id])

    return <div key={props.t.id} className={props.t.isDone ? 'is-done' : ''}>
        <Checkbox onChange={onChangeStatusHandler} checked={props.t.isDone}/>
        <EditableSpan title={props.t.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})