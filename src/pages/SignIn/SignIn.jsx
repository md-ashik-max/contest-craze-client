import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillEyeInvisible } from "react-icons/ai";


const SignIn = () => {

    // const { user, loading, signIn, googleLogin } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    // const location = useLocation();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (user) {
    //         navigate('/')
    //     }
    // }, [user, navigate])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        // signIn(email, password)
        //     .then(() => {
        //         Swal.fire({
        //             icon: "success",
        //             title: "Sign in User Successfully",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //         navigate(location?.state ? location.state : "/")
        //     })
        //     .catch(error => {
        //         console.error(error)
        //         toast.error(error.message)
        //     })

    };

    // const loginWithGoogle = () => {
    //     googleLogin();
    //     navigate(location?.state ? location.state : "/")
    //     Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Sign in User Successfully",
    //         showConfirmButton: false,
    //         timer: 1500
    //     });

    // };
    // const loginWithGithub = () => {
    //     githubLogin();
    //     Swal.fire({
    //         icon: "success",
    //         title: "Sign in User Successfully",
    //         showConfirmButton: false,
    //         timer: 1500
    //     });
    //     navigate(location?.state ? location.state : "/")

    // };
    // if (user || loading) return


    return (
        <div className="flex flex-col my-12 md:flex-row justify-center items-center max-w-5xl mx-auto rounded-2xl shadow-2xl">
            <div className="animate__animated animate__fadeInRight card shrink-0 w-full md:w-1/2 py-6 bg-base-100">
                <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold">Login</h3>
                    <div className="flex gap-8 text-xl my-6">
                        <button className="btn bg-transparent text-emerald-300 border border-sky-400 hover:text-white  hover:bg-gradient-to-r from-emerald-300 to-sky-400"><FaGoogle></FaGoogle></button>
                        <button className="btn bg-transparent text-emerald-300 border border-sky-400 hover:text-white  hover:bg-gradient-to-r from-emerald-300 to-sky-400"><FaFacebookF></FaFacebookF></button>
                        {/* <button onClick={() => loginWithGithub()} className="btn bg-transparent text-emerald-300 border border-sky-400 hover:text-white  hover:bg-gradient-to-r from-emerald-300 to-sky-400"><FaGithub></FaGithub></button> */}

                    </div>
                    <div className="divider px-8">OR</div>
                    <p>use your email password</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered w-full" {...register("password", { required: true })} />
                        </div>
                        {errors.password && <span className="text-red-500">This field is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <button className="btn bg-transparent text-emerald-300 border border-sky-400 hover:text-white  hover:bg-gradient-to-r from-emerald-300 to-sky-400">Login</button>
                    </div>
                </form>
            </div>
            <div className="animate__animated animate__fadeInRight md:ml-12 w-full h-full py-6  md:py-56 flex flex-col items-center bg-[#0677A1] rounded-r-2xl rounded-t-3xl md:rounded-l-[150px] text-white text-center">
                <h3 className="text-4xl font-bold">Hello Friend!</h3>
                <p className="my-6">Register with your personal details to use all <br /> of site features</p>
                <Link to='/register'><button className="btn bg-gradient-to-r from-emerald-300 to-sky-400 text-white">Register</button></Link>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SignIn;