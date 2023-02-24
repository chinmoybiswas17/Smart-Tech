import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const [loginUserEmail, setLoginUserEmail] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    // console.log(location.pathname);

    const from = location.state?.from?.pathname || '/';


    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');

        signIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                setLoginUserEmail(data.email);
                navigate('/dashboard')
            })
            .catch(err => {
                console.error(err);
                setLoginError(err.message);
            })
    }
    return (
        <div className='w-[450px] mx-auto shadow-xl p-7 my-4'>
            <h2 className='text-2xl text-center text-primary font-bold'>Login</h2>

            <form onSubmit={handleSubmit(handleLogin)}>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full" />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                        })}
                        className="input input-bordered w-full" />

                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}

                    <label className="label">
                        <Link className="label-text-alt">Forgot Password?</Link>
                    </label>
                </div>

                <input type="submit" className='btn btn-primary text-white w-full mt-9 mb-3' value='Login' />
                <div>
                    {loginError && <p className='text-error'>{loginError}</p>}
                </div>

            </form>

            <p className='text-center'>New to Smart Tech? <Link to='/signup' className='text-secondary'>Create new account</Link></p>

            <div>
                <div className="divider mt-4">OR</div>
                <button className='btn btn-outline btn-secondary w-full mt-4 mb-3' disabled> <FaGoogle/> <span className='mx-4'>Continue with google</span></button>
            </div>
        </div>
    );
};

export default Login;