import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskButton = () => {
        //.trim() обрезает пробелы с обоих сторон
        if (newTaskTitle.trim() === '') {
            return setError('Field is required')
        }
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            //deleted under (newTasktitle, props.id)
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    return (
        <div>
            <TextField value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                       // convert not a boolean into boolean by using !!error...
                // also works the same with !![], !!{}, !!'' ect
                   error={!!error} variant="outlined" label={'Type here'} helperText={error}/>
            <IconButton onClick={addTaskButton} color={'primary'}><ControlPoint /></IconButton>
        </div>
    )
}