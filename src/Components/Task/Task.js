import React, { useContext, useState } from 'react';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from '../../Context/UserContext';
import Loader from '../Loading/Loader';
import EditTask from './EditTask';

const Task = ({task, refetch, hadleCompleteTask, loading, deleteTask }) => {
    // const {updateValue,setUpValue, setEditTask, editTask } = useContext(AuthContext);
    const [editTask, setEditTask] = useState(false);
    const [updateValue, setUpValue] = useState(false);
    if (loading) {
        return <Loader></Loader>
    }


    return (
        <span className='mt-2'>
            <div className='icons mb-2 text-2xl justify-between flex items-center'>
                <div className="">
                    <label onClick={() => hadleCompleteTask(task?._id, updateValue)} className="cursor-pointer label">
                        <input type="checkbox" className="checkbox border-2 borde-success checkbox-success" />
                        <span className="label-text mt-1">Complete</span>
                    </label>
                </div>
                <div className='flex items-center'>
                    <button onClick={() => setEditTask(true)}><FaRegEdit className='mr-2 cursor-pointer hover:text-blue-500'></FaRegEdit></button>
                    {/* <input type='checkbox' onClick={() => setEditTask(true)}><FaRegEdit className='mr-2 cursor-pointer hover:text-blue-500'></FaRegEdit></input> */}
                    <button onClick={() => deleteTask(task?._id)}><FaRegTrashAlt className=' cursor-pointer text-red-500 hover:text-red-700'></FaRegTrashAlt></button>
                </div>
            </div>
            {editTask ?
                <EditTask refetch={refetch} task={task} setEditTask={setEditTask}></EditTask>
                :
                <div className='ml-3'>
                    {task?.taskcontent}
                </div>
            }
        </span>
    );
};

export default Task;