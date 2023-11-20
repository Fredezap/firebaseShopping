import React, { useContext, useEffect, useState } from 'react';
import { addNewTask, getAllTasks, updateTask, deleteTask } from '../firebase/tasksController';
import { Update } from '@mui/icons-material';
import { appContext } from '../App';

const TaskList = () => {

    const { setRoute, user, setUser } = useContext(appContext);

    

    const [mode, setMode] = useState("add");

    const InitializeTasks = () => {
        getAllTasks()
        .then(t => setTasks([...t]))
        .catch(e => console.error(e));
    }

    const [task, setTask] = useState(
        {
            title: "",
            description: ""
        }
    );

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        InitializeTasks();
        setTask( {...task} )
    }, []);

    const createNewTask = async () => {
        await addNewTask(task).catch(e => console.error(e));
        setTask({ title: "", description: "" })
        InitializeTasks()
    }

    const editTask = async (id) => {
        setMode('update')
        const taskToEdit = tasks.find(t => t.id === id)
        setTask( {...taskToEdit} )
    }

    const ModifyTask = async () => {
        await updateTask(task);
        InitializeTasks();
        setTask({ title: "", description: "" })
        setMode('add')
    }

    const destroyTask = async (id) => {
        await deleteTask(id);
        InitializeTasks();
    }
    
    return (
        <div>
            <div className='flex flex-col gap-4'>
            <h1 className='text-sky-400 font-semibold text-xl'>Task list</h1>
            <div className='flex flex-col gap-4'>
                <h2 className='font-semibold mt-2'>Introduce una nueva tarea</h2>
                <input
                    type="text"
                    placeholder="Titulo"
                    disabled={!user}
                    onChange={(e) => setTask({...task, title: e.target.value})}
                    value={task.title}
                    className='border shadow outline-none focus:ring-2 ring-sky-200 rounded py-1 px-4 w-full' />  
                <textarea
                    type="text"
                    placeholder="Descripcion"
                    rows={3}
                    disabled={!user}
                    value={task.description}
                    onChange={(e) => setTask({...task, description: e.target.value})}
                    className='border shadow outline-none focus:ring-2 ring-sky-200 rounded py-1 px-4 w-full' />
                <button
                    disabled={!user}
                    onClick={() => mode === "add" ? createNewTask() : ModifyTask()}
                    className='font-semibold bg-sky-400 text-white py-2 rounded hover:bg-sky-500 disabled:bg-sky-200'>
                    {mode === "add" ? "Añadir" : "Actualizar"}
                </button>
            </div>
            {user && (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                    {tasks.length === 0 ? 
                        (<p>Aun no se han agregado tareas</p>) : 
                        tasks.map((t) => (
                        <div key={t.id} className='flex flex-col gap-3 border p-4 border-sky-200 rounded-xl'>
                            <h1 className='font-semibold'>{t.title}</h1>
                            <div className='border-t border-sky-200'></div>
                            <p>{t.description}</p>
                    <div className='flex justify-between mt-4'>
                        <button
                            onClick={() => editTask(t.id)}
                            className='bg-green-700 text-white rounded py-2 px-5'>
                            Editar
                        </button>
                        <button
                            onClick={() => 
                            window.confirm("Estas seguro que quieres eliminar esta tarea?") &&
                            destroyTask(t.id)}
                            className='bg-red-700 text-white rounded py-2 px-5'>
                            Eliminar
                        </button>
                    </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        {!user && (
            <p className='text-red-700 font-semibold mt-7 '>Debes estar logueado para poder ver y agregar tareas</p>
        )}
    </div>
    );
}

export default TaskList;
