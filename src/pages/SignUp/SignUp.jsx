import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";


const SignUp = () => {
    const { user, loading, createUser, updateUserProfile } = useAuth();
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        const fullName = data.fullName;
        const image = data.image; 
        createUser(email, password)
            .then(() => {
                updateUserProfile(fullName, image)
                    .then(() => {
                        navigate(location?.state ? location.state : "/")
                        Swal.fire({
                            icon: "success",
                            title: "Created User Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    })

            })
            .catch(error => {
                setRegisterError(error.message)
            })

    }

    if (user || loading) return
    return (
        <div className="flex flex-col my-12 md:flex-row justify-center items-center max-w-5xl mx-auto rounded-2xl shadow-2xl">
            <div className="animate__animated animate__fadeInRight w-full h-full py-6  md:py-[244px] flex flex-col items-center bg-[#512DA8] rounded-r-2xl rounded-t-3xl md:rounded-r-[150px] text-center text-white">
                <h3 className="text-4xl font-bold">Welcome Back!</h3>
                <p className="my-6">Enter your personal details to use all <br /> of site features</p>
                <Link to='/signIn'><button className="btn bg-gradient-to-r from-emerald-300 to-sky-400 text-white">Login</button></Link>
            </div>
            <div className="animate__animated animate__fadeInRight card shrink-0 w-full md:w-1/2 py-6 bg-base-100">
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold">Register</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name="name" className="input input-bordered" {...register("fullName", { required: true })} />
                        {errors.fullName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" {...register("image")} />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" name="email" className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            {showPassword ? <span className="absolute right-2 top-4 text-xl" onClick={() => setShowPassword(!showPassword)}><IoEyeSharp /></span> : <span className="absolute right-2 top-4 text-xl" onClick={() => setShowPassword(!showPassword)}><AiFillEyeInvisible /></span>}
                            <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/
                            })} />
                        </div>
                        {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 character</span>}
                        {errors.password?.type === 'maxLength' && <span className="text-red-500">Password must be less then 20 character</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-500">Password must be at least one uppercase, one lowercase, one special character and one number</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-transparent text-emerald-300 border border-sky-400 hover:text-white  hover:bg-gradient-to-r from-emerald-300 to-sky-400">Register</button>
                        {
                            registerError && <p className="text-red-600">{registerError}</p>
                        }
                    </div>
                </form>
            </div>

        </div>
    );
};

export default SignUp;