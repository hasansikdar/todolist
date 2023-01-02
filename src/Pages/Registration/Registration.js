import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Registration = () => {
    const { createuser, updateprofileinfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = event => {
        event.preventDefault();
        setLoading(true)
        const userName = event.target.userName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const userInfo = {
            userName,
            email,
            password
        }
        createuser(email, password)
            .then(res => {
                updateprofileinfo({ displayName: userName })
                    .then(res => {
                        SaveUserInDb(userInfo)
                    })
                    .catch(error => {
                        toast.error(error.message);
                        setLoading(false);
                        console.log(error)
                    })
            })
            .catch(error => {
                toast.error(error.message)
                console.log(error)
                setLoading(false);
            })

    }

    const SaveUserInDb = info => {
        fetch('https://todolist-six-azure.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Register Successful')
                    setLoading(false);
                    navigate('/');
                }
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            })
    }



    return (
        <div className='authentication register'>
            <div class="box" style={{ height: '530px' }}>
                <form onSubmit={handleCreateAccount} class="form">
                    <h2>Sinup</h2>
                    <div class="inputBox">
                        <input name="userName" required="required" type="text" />
                        <span>Username</span>
                        <i></i>
                    </div>
                    <div class="inputBox">
                        <input name="email" required="required" type="email" />
                        <span>Email</span>
                        <i></i>
                    </div>
                    <div class="inputBox">
                        <input name="password" required="required" type="password" />
                        <span>Password</span>
                        <i></i>
                    </div>
                    <div class="links">
                        <a style={{ color: "#45f3ff" }} href="#">If you have account Please</a>
                        <Link to='/login'>Singin</Link>
                    </div>
                    {loading ?
                        <button className="btn btn-square loading"></button> :

                        <input type="submit" value='Signin' />
                    }
                    <img className='w-10 mt-4 cursor-pointer mx-auto' src='https://i.ibb.co/y5dT84r/google.png' alt="" />
                </form>
            </div>
        </div>
    );
};

export default Registration;