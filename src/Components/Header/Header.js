import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaSignOutAlt,FaHome, FaUserAlt, FaCheck, FaSignInAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        const confirm = window.confirm('Are your Sure Logout ?');
        if (confirm) {
            logout()
                .then(res => {
                    toast.success('Logout')
                })
                .catch(error => {
                    toast.error(error.message);
                    console.log(error)
                })
        }
    }

    return (
        <div className='header md:mx-auto h-14 w-full md:w-3/12 flex rounded items-center justify-center absolute md:inset-x-10 !bottom-14'>
            <div className='text-center flex items-center justify-between w-full p-2 px-10 md:px-4'>
                <Link to='/'><FaHome className='text-xl cursor-pointer'></FaHome></Link>
                <Link to='/completed'><FaCheck className='text-xl  cursor-pointer'></FaCheck></Link>
                <Link to='/profile'><FaUserAlt className='text-xl cursor-pointer'></FaUserAlt></Link>
                {user?.email ?
                    <button onClick={handleLogout}><FaSignOutAlt className='text-xl  cursor-pointer'></FaSignOutAlt></button>
                    :
                    <Link to='/login'><FaSignInAlt className='text-xl cursor-pointer'></FaSignInAlt></Link>
                }
            </div>
        </div>
    );
};

export default Header;