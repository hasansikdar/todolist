import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Task from '../Task/Task';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loading/Loader';
import Header from '../Header/Header';

const MainTask = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    // const [updateValue, setUpValue] = useState(true);

    const { data: tasks = [], refetch, } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            setLoading(true);
            const res = await fetch(`https://todolist-six-azure.vercel.app/tasks?email=${user?.email}`);
            const data = await res.json();
            setLoading(false);
            return data;
        }
    })

    // const { data: tasks = [], refetch } = useQuery({
    //     queryKey: [user?.email],
    //     queryFn: () => {
    //         setLoading(true)
    //         fetch(`https://todolist-six-azure.vercel.app/tasks?email=${user?.email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setLoading(false);
    //                 return data;
    //             })
    //     }
    // })


    // updatecomplete task
    const hadleCompleteTask = (id) => {

        setLoading(true);
        fetch(`https://todolist-six-azure.vercel.app/tasksComplete/${id}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({taskStatus: 'Completed'})
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                refetch();
                setLoading(false);
                toast.success('Congratulations Task Completed');
            }
        })
        .catch(error => {
            toast.error(error.message);
            console.log(error);
            setLoading(false);
        })
    }



    const handleAddTask = event => {
        event.preventDefault();
        setLoading(true)
        const addTask = event.target.addtask.value;

        const taskinfo = {
            userEmail: user?.email,
            taskcontent: addTask,
            taskStatus: 'Uncompleted',
        }
        fetch('https://todolist-six-azure.vercel.app/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskinfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    event.target.reset();
                    refetch();
                    setLoading(false)
                    toast.success('Task Added')
                }
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
                setLoading(false);
            })

    }

    const deleteTask = id => {
        setLoading(true)
        const confirm = window.confirm('Are you sure you Delete the Task');
        if (confirm) {
            fetch(`https://todolist-six-azure.vercel.app/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.acknowledged) {
                        setLoading(false);
                        refetch();
                        toast.error('Task Deleted')
                    }
                })
        }
    }
    // const updateTask = taskInfo => {
    //     setupdateTaskinfo(taskInfo)
    // }



    return (
        <div className="authentication main-task">
            <div class="box">
                <div class="form">
                    <form onSubmit={handleAddTask} action="">
                        <h2>Add Task</h2>
                        <div class="inputBox addtask">
                            <input name="addtask" required="required" type="text" />
                            <button disabled={loading} className=''><FaPlus className='text-3xl mx-auto'></FaPlus></button>
                            <span>{loading ? 'Task Loading....' : 'Add Task'}</span>
                            <i></i>
                        </div>
                    </form>
                    <div class="tasks mt-10">
                        {loading ? <Loader></Loader>:
                            tasks.map(task => <Task hadleCompleteTask={hadleCompleteTask} loading={loading} refetch={refetch} deleteTask={deleteTask} task={task}></Task>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTask;