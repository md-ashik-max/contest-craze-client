import { Link, NavLink } from "react-router-dom";


const Navbar = () => {

    const links = <>
        <li><NavLink to='/' style={({ isActive }) => ({
            color: isActive ? '#E64398' : 'black',
            backgroundColor: 'transparent',
        })}>Home</NavLink></li>
        <li><NavLink to='/allContest' style={({ isActive }) => ({
            color: isActive ? '#E64398' : 'black',
            backgroundColor: 'transparent',
        })}>All Contest</NavLink></li>

    </>

    return (
        <div className="navbar bg-base-100 fixed z-10 px-24">
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
                        <img className="w-32 h-32" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                        <h3 className="text-4xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg font-bold">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link>
                        <button className="btn text-lg font-bold text-[#E64398] bg-transparent border-2 border-[#E64398] hover:text-white hover:bg-[#E64398]">Sign In</button>
                    </Link>
                </div>
        </div>
    );
};

export default Navbar;