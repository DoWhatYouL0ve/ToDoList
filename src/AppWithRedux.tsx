import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import Container from '@material-ui/core/Container'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FiltersValueType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const toDoLists = useSelector<AppRootStateType, Array<ToDoListType>>(state => state.toDoList)
    const tasksObj = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FiltersValueType, todolistID: string) {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    let deleteToDoList = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }

    function changeToDoListTitle(newTitle: string, todolistId: string) {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }

    function addToDoList(title: string) {
        dispatch(addTodolistAC(title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        toDoLists.map(td => {
                            let tasksForToDoList = tasksObj[td.id];
                            if (td.filter === 'completed') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
                            }
                            if (td.filter === 'active') {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
                            }
                            return <Grid item><Paper style={{padding:"10px"}}  elevation={3}><ToDoList
                                key={td.id}
                                id={td.id}
                                title={td.title}
                                tasks={tasksForToDoList}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={td.filter}
                                deleteToDoList={deleteToDoList}
                                changeTaskTitle={changeTaskTitle}
                                changeToDoListTitle={changeToDoListTitle}
                            /></Paper></Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>

    );
}


export default AppWithRedux;
