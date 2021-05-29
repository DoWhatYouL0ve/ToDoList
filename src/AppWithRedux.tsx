import React, {useCallback} from 'react';
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

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FiltersValueType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }, [dispatch])

    const changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [dispatch])

    const deleteToDoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const changeToDoListTitle = useCallback((newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

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
