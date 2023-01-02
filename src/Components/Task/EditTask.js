import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';


const EditTask = ({refetch, task, setEditTask  }) => {
    // const { setUpdateValue, setEditTask } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [updateValue, setUpdateValue] = useState("");

    

    const handleUpdateTask = id => {
        setLoading(true);
        fetch(`https://todolist-six-azure.vercel.app/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ updateValue })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Updated');
                    setEditTask(false);
                    setLoading(false);
                    refetch();
                }
            })
            .catch(error => {
                toast.error(error.message);
                console.log(error);
                setLoading(false);
            })

    }


    return (
        <div className='p-3'>
            <input onBlur={e => setUpdateValue(e.target.value)} className='text-white p-2 rounded' defaultValue={task?.taskcontent} type="text" />
            <div className='mt-2'>
                <button disabled={loading} onClick={() => handleUpdateTask(task?._id)} className='btn-primary btn btn-sm mr-2'>{loading ? "Saving.." :'save'}</button>
                <button className='btn-error btn btn-sm' onClick={() => setEditTask(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default EditTask;