import useAuth from "../../../hooks/useAuth";
import { MdOutlineEmail } from "react-icons/md";


const AdminHome = () => {
    const { user } = useAuth()
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#0677A1] to-[#1E90FF] p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#1E90FF] to-[#0677A1] p-6 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2">Admin Dashboard at Contest Craze</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="flex flex-col items-center md:w-1/3 mb-8 md:mb-0">
                        <div className="relative">
                            <img
                                className="h-32 w-32 md:w-40 md:h-40 rounded-full shadow-xl border-4 border-white"
                                src={user?.photoURL}
                                alt={user?.displayName}
                            />
                            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-2 border-white shadow-md">
                                <MdOutlineEmail className="text-white" />
                            </div>
                        </div>
                        <p className="mt-4 text-2xl font-semibold text-gray-800">{user?.displayName}</p>
                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                            <MdOutlineEmail className="text-xl text-blue-500" />
                            {user?.email}
                        </p>
                    </div>
                    <div className="md:w-2/3 text-center md:text-left px-4">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome to Contest Craze Admin Dashboard!</h2>
                        <p className="mt-4 text-lg text-gray-700">
                            As an admin, you have the power to oversee all activities on Contest Craze. Manage users, review submissions, and ensure everything runs smoothly. This dashboard is your control center to make impactful decisions and help nurture the community of creators. Explore the tools and features designed to assist you in your role, and make the most of your administrative privileges to support creativity and innovation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;