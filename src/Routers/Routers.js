import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Main from '../Layout/Main';
import CompleteTask from '../Pages/CompletedTask/CompleteTask';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Profile from '../Pages/Profile/Profile';
import Registration from '../Pages/Registration/Registration';
import PrivateRouter from '../PrivateRouter/PrivateRouter';

const Routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRouter><Home></Home></PrivateRouter>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Registration></Registration>
            },
            {
                path: '/completed',
                element: <CompleteTask></CompleteTask>
            },
            {
                path: '/profile',
                element: <Profile></Profile>
            }
        ]
    }
])

export default Routers;