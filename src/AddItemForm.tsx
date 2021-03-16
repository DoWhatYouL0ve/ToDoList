import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            <button onClick={addTaskButton}>+</button>
            {error && <div className={'error-message'}>Field is required</div>}
        </div>
    )
}