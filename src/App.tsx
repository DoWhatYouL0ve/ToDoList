import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import Container from '@material-ui/core/Container'

export type FiltersValueType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: FiltersValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let newFilteredTask = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId]
        let newTasks = [newFilteredTask, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function changeFilter(value: FiltersValueType, todolistID: string) {
        let todolist = toDoLists.find(td => td.id === todolistID)
        if (todolist) {
            todolist.filter = value
            //чтобы функция обновила изменения и отработала нужно в нее передать изменения,
            // для этого передаем копию обьекта внутрь, что бы ей было понятно что изменения произошли
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            //чтобы функция обновила изменения и отработала нужно в нее передать изменения,
            // для этого передаем копию обьекта внутрь, что бы ей было понятно что изменения произошли
            setTasks({...tasksObj})
        }

    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            //чтобы функция обновила изменения и отработала нужно в нее передать изменения,
            // для этого передаем копию обьекта внутрь, что бы ей было понятно что изменения произошли
            setTasks({...tasksObj})
        }

    }

    let toDoList1 = v1()
    let toDoList2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<ToDoListType>>([
        {id: toDoList1, title: 'What to learn', filter: 'all'},
        {id: toDoList2, title: 'What to buy', filter: 'all'}
    ])

    let deleteToDoList = (todolistId: string) => {
        let filteredToDoList = toDoLists.filter(td => td.id !== todolistId)
        setToDoLists(filteredToDoList)
        // delete позволяет удалить свойствоб а в нашем случае целый todolist из фронтенда
        delete tasksObj[todolistId]
        // удаляем данные удаленные ранее теперь уже из бизнес хранилища и перерисовываем
        setTasks({...tasksObj})
    }

    function changeToDoListTitle(todolistId: string, newTitle: string) {
        const todolist = toDoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = newTitle
            setToDoLists([...toDoLists])
        }
    }

    let [tasksObj, setTasks] = useState<TaskStateType>({
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

    function addToDoList(title: string) {
        let toDoList: ToDoListType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setToDoLists([toDoList, ...toDoLists])
        setTasks({
            ...tasksObj,
            [toDoList.id]: []
        })
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


export default App;
