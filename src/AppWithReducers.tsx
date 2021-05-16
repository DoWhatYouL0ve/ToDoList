import React, {useReducer} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import Container from '@material-ui/core/Container'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FiltersValueType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let toDoList1 = v1()
    let toDoList2 = v1()

    let [toDoLists, dispatchToSetToDoLists] = useReducer(todolistsReducer,[
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchToSetTasks] = useReducer(tasksReducer,{
        [toDoList1]: [
            {id: v1(), title: "HTML/CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [toDoList2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Monitor", isDone: true},
            {id: v1(), title: "Adapter", isDone: false},
        ]
    })

    function removeTask(todolistId: string, id: string) {
        dispatchToSetTasks(removeTaskAC(todolistId, id))

    }

    function addTask(title: string, todolistId: string) {
        dispatchToSetTasks(addTaskAC(title, todolistId))
    }

    function changeFilter(value: FiltersValueType, todolistID: string) {
        dispatchToSetToDoLists(changeTodolistFilterAC(value, todolistID))
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        dispatchToSetTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    function changeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatchToSetTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }

    let deleteToDoList = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToSetToDoLists(action)
        dispatchToSetTasks(action)
    }

    function changeToDoListTitle(newTitle: string, todolistId: string) {
        dispatchToSetToDoLists(changeTodolistTitleAC(newTitle, todolistId))
    }

    function addToDoList(title: string) {
        let action = addTodolistAC(title)
        dispatchToSetToDoLists(action)
        dispatchToSetTasks(action)
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


export default AppWithReducers;
