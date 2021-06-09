import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'ToDoList/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action("Status changed")
const changeTaskTitle = action("Title changed")
const removeTask = action("Task was deleted")

export const TaskBaseExample = () => {
    return <>
        <Task changeTaskStatus={ changeTaskStatus } changeTaskTitle={changeTaskTitle} removeTask={removeTask} t={{id: "1", isDone: true, title: "React" }} id={"todolist1"} />
        <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} removeTask={removeTask} t={{id: "2", isDone: false, title: "Angular" }} id={"todolist2"} />
    </>
}