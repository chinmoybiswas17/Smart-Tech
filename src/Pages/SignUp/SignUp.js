import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUser, providerLogin } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const navigate = useNavigate();

    const googleProvider = new GoogleAuthProvider;

    const handleSignUp = (data) => {
        console.log(data);

        createUser(data.email, data.password, data.role)
            .then(res => {
                const user = res.user;
                console.log(user);
                toast.success('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role)
                        console.log("User info updated");
                        navigate('/dashboard');
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });

    }

    const saveUser = (name, email, role) => {
        const user = { name, email, role };
        fetch(' https://used-product-resale-market-server-roan.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);

            })
    };

    const handleGoogleSignIn = () => {
        console.log("clicked!")
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                saveUser(user.displayName, user.email, "buyer")
                navigate('/dashboard');
            })
            .catch(error => console.error(error));
    }

    return (
        <div className='w-[450px] mx-auto shadow-xl p-7 my-4'>
            <h2 className='text-2xl text-center text-primary font-bold'>Sign Up</h2>

            <form onSubmit={handleSubmit(handleSignUp)}>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className='text-error'>{errors.name?.message}</p>}
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"
                        {...register("email", { required: "Email Address is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}
                </div>


                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be 6 characters or longer' },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })}
                        className="input input-bordered w-full" />

                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}
                </div>


                <div className='form-control w-full my-4 border-2 border-primary p-2'>
                    <select {...register("role", { required: "Role is required" })}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>
                    {errors.role && <p className='text-error'>{errors.role?.message}</p>}
                </div>




                <input type="submit" className='btn btn-secondary text-white w-full mt-9 mb-3' value='Sign Up' />

            </form>

            <p className='text-center'>Already have an account? <Link to='/login' className='text-secondary'>Login</Link></p>

            <div>
                <div className="divider mt-4">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline btn-secondary w-full mt-4 mb-3'> <FaGoogle /> <span className='mx-4'>Continue with google</span></button>
            </div>
        </div>
    );
};

export default SignUp;