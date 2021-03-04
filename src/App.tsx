import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FiltersValueType = 'all' | 'active' | 'completed';

type ToDoListtype = {
    id: string
    title: string
    filter: FiltersValueType
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
        let todolist= toDoLists.find( td => td.id === todolistID)
        if (todolist) {
            todolist.filter = value
            //чтобы функция обновила изменения и отработала нужно в нее передать изменения,
            // для этого передаем копию обьекта внутрь, что бы ей было понятно что изменения произошли
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            //чтобы функция обновила изменения и отработала нужно в нее передать изменения,
            // для этого передаем копию обьекта внутрь, что бы ей было понятно что изменения произошли
            setTasks({...tasksObj})
        }

    }

    let toDoList1 = v1()
    let toDoList2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<ToDoListtype>>([
        {id: toDoList1, title: 'What to learn', filter: 'active'},
        {id: toDoList2, title: 'What to buy', filter: 'completed'}
    ])

    let deleteToDoList = (todolistId: string) => {
        let filteredToDoList = toDoLists.filter( td => td.id !== todolistId)
        setToDoLists(filteredToDoList)
        // delete позволяет удалить свойствоб а в нашем случае целый todolist из фронтенда
        delete tasksObj[todolistId]
        // удаляем данные удаленные ранее теперь уже из бизнес хранилища и перерисовываем
        setTasks({...tasksObj})
    }

    let [tasksObj, setTasks] = useState({
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

    return (
        <div className="App">
            {
                toDoLists.map(td => {
                    let tasksForToDoList = tasksObj[td.id];
                    if (td.filter === 'completed') {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
                    }
                    if (td.filter === 'active') {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
                    }
                    return <ToDoList
                        key={td.id}
                        id={td.id}
                        title={td.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={td.filter}
                        deleteToDoList={deleteToDoList}
                    />
                })
            }
        </div>

    );
}


export default App;
