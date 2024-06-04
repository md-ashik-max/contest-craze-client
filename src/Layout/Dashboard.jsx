import { FaHome, FaList, FaListAlt, FaUsers, FaWallet } from "react-icons/fa";
import { MdPostAdd, MdRateReview } from "react-icons/md";
import { BiSolidToTop } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import { LuListChecks } from "react-icons/lu";
import { BsTrophy } from "react-icons/bs";


const Dashboard = () => {
    const isAdmin = true;
    const isCreator = false;
    return (
        <div className="flex">
            <div className="lg:w-64 min-h-screen bg-[#0677A1]">
                <ul className="menu text-white lg:font-bold">
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/manageUsers'><FaUsers /> Manage Users</NavLink></li>
                                <li><NavLink to='/dashboard/manageContests'><FaList></FaList> Manage Contests</NavLink></li>
                            </>
                            : isCreator ?

                                <>
                                    <li><NavLink to='/dashboard/creatorHome'><FaHome></FaHome> Creator Home</NavLink></li>
                                    <li><NavLink to='/dashboard/addContest'><MdPostAdd /> Add Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/myCreated'><FaListAlt /> My Created Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/submittedContest'><BiSolidToTop /> Submitted Contest</NavLink></li>
                                </>
                                :
                                <>
                                    <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                                    <li><NavLink to='/dashboard/reservation'><LuListChecks /> MyParticipated Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/payment'><FaWallet></FaWallet> Payment History</NavLink></li>
                                    <li><NavLink to='/dashboard/cart'><BsTrophy />My Winning Contest</NavLink></li>
                                    <li><NavLink to='/dashboard/review'><MdRateReview /> Add Review</NavLink></li>
                                </>
                    }

                    <div className="divider"></div>
                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>

                </ul>

            </div>
            <div className="flex-1 p-4 lg:p-16">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;