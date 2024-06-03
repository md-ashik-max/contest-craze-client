import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { CgLogOut } from "react-icons/cg";


const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Log Out Successfully",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                    }
                });
            })
            .catch(error => {
                console.log(error)
            })
    }


    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    const links = <>
        <li><NavLink to='/' style={({ isActive }) => ({
            color: isActive ? '#0677A1' : '',
            backgroundColor: 'transparent',
        })}>Home</NavLink></li>
        <li><NavLink to='/allContest' style={({ isActive }) => ({
            color: isActive ? '#0677A1' : '',
            backgroundColor: 'transparent',
        })}>All Contest</NavLink></li>

    </>

    return (
        <div className="navbar bg-base-100 fixed z-50 md:px-24">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg font-bold">
                        {links}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img className="w-12 h-12 md:w-24 md:h-24" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                    <h3 className="text-xl md:text-4xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg font-bold">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <label className="swap swap-rotate">

                    {/* this hidden checkbox controls the state */}
                    <input onChange={handleToggle} type="checkbox" checked={theme === "dark" ? false : true} />

                    {/* sun icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                    {/* moon icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                </label>
                {user ? <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button"><img className="w-14 h-14 rounded-full" src={user?.photoURL} alt="" /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-4">
                            <li><h3 className="text-xl font-bold">{user?.displayName}</h3></li>
                            <li><button className="font-bold text-[#0677A1] bg-transparent hover:text-white">Dashboard</button></li>
                            <li> <button onClick={handleLogOut} className="text-black font-bold hover:text-red-600">Log Out <CgLogOut className="text-xl font-bold"></CgLogOut></button></li>
                        </ul>
                    </div>
                </>
                    :
                    <Link to='/signIn'>
                        <button className="btn md:text-lg font-bold text-[#0677A1] bg-transparent border-2 border-[#0677A1] hover:text-white hover:bg-[#0677A1]">Sign In</button>
                    </Link>
                }

            </div>
        </div>
    );
};

export default Navbar;