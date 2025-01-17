import { FaHome, FaList, FaListAlt, FaUsers } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { BiSolidToTop } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { LuListChecks } from "react-icons/lu";
import { BsTrophy } from "react-icons/bs";
import { GiLaurelsTrophy } from "react-icons/gi";
import useAdmin from "../hooks/useAdmin";
import useCreator from "../hooks/useCreator";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isCreator] = useCreator();
    return (
        <div>
             <Helmet>
                <title>Contest Craze / Dashboard</title>
            </Helmet>
            <div className="flex">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content p-6 fixed bg-white bg-fixed">
                    <div className="flex items-center">
                        <label htmlFor="my-drawer" className="btn text-2xl font-bold drawer-button"><HiOutlineBars3 /></label>
                        <div className="flex items-center">
                            <img className="w-12 h-12" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                            <h3 className="text-xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                        </div>
                    </div>

                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#0677A1] text-white font-bold">
                        {
                            isAdmin ?
                                <>
                                    <div className="flex flex-col my-6">
                                        <img className="w-12 h-12" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                                        <h3 className="text-xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                                    </div>
                                    <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                                    <li><NavLink to='/dashboard/manageUsers'><FaUsers /> Manage Users</NavLink></li>
                                    <li><NavLink to='/dashboard/manageContest'><FaList></FaList> Manage Contests</NavLink></li>
                                </>
                                : isCreator ?

                                    <>
                                        <div className="flex flex-col my-6">
                                            <img className="w-12 h-12" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                                            <h3 className="text-xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                                        </div>
                                        <li><NavLink to='/dashboard/creatorHome'><FaHome></FaHome> Creator Home</NavLink></li>
                                        <li><NavLink to='/dashboard/addContest'><MdPostAdd /> Add Contest</NavLink></li>
                                        <li><NavLink to='/dashboard/myCreated'><FaListAlt /> My Created Contest</NavLink></li>
                                        <li><NavLink to='/dashboard/submittedContest'><BiSolidToTop /> Submitted Contest</NavLink></li>
                                      
                                    </>
                                    :
                                    <>
                                        <div className="flex flex-col my-6">
                                            <img className="w-12 h-12" src="https://i.ibb.co/kXJXvX6/design-13-removebg-preview.png" alt="" />
                                            <h3 className="text-xl font-black font-roboto">Contest <span className="text-[#E64398]">Craze</span></h3>
                                        </div>
                                        <li><NavLink to='/dashboard/userProfile'><FaHome></FaHome>My Profile</NavLink></li>
                                        <li><NavLink to='/dashboard/participate'><LuListChecks /> MyParticipated Contest</NavLink></li>
                                        <li><NavLink to='/dashboard/winningContest'><BsTrophy />My Winning Contest</NavLink></li>
                                        <li><NavLink to='/dashboard/leaderBoard'><GiLaurelsTrophy /> LeaderBoard</NavLink></li>
                                    </>
                        }

                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 p-4 max-w-7xl mx-auto my-32">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;