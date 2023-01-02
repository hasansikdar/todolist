import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleIcon from '../../Assests/google.png';
import { AuthContext } from '../../Context/UserContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        setLoading(true);
        const email = event.target.email.value;
        const password = event.target.password.value;

        login(email, password)
            .then(res => {
                toast.success('Login Successfull')
                navigate(from, { replace: false })
                setLoading(false);
            })
            .catch(error => {
                toast.error(error.message)
                console.log(error)
                setLoading(false);

            })

    }

    return (
        <div className='authentication register'>
            <div class="box">
                <form onSubmit={handleLogin} class="form">
                    <h2>Singin</h2>
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
                        <a href="#">Forgot Password</a>
                        <Link to='/register'>Sign up</Link>
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

export default Login;