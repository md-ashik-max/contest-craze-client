import { MdOutlineEmail } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from "recharts";
import UpdateProfile from "./UpdateProfile";
import { useMemo } from "react";
const participationData = [
    { name: 'Contest 1', participated: 1, won: 1 },
    { name: 'Contest 2', participated: 1, won: 0 },
    { name: 'Contest 3', participated: 1, won: 1 },
    { name: 'Contest 4', participated: 1, won: 0 },
    { name: 'Contest 5', participated: 1, won: 1 },
];

const getPath = (x, y, width, height) => (
    `M${x},${y + height}
     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
     C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
     Z`
);

const TriangleBar = ({ fill, x, y, width, height }) => {
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ backgroundColor: 'white', padding: '5px' }}>
                <p>{`Name: ${data.name}`}</p>
                <p>{`Value: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};


const MyProfile = () => {
    const { user } = useAuth();
    const barChart = useMemo(() => (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="won" fill="#00C29C" shape={<TriangleBar />} />
            </BarChart>
        </ResponsiveContainer>
    ), []);

    const pieChart = useMemo(() => (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={participationData}
                    dataKey="participated"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    ), []);


    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#0677A1] to-[#1E90FF] py-24">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-[#1E90FF] to-[#0677A1] p-6 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2">User Profile at Contest Craze</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="flex flex-col items-center md:w-1/3 mb-8 md:mb-0">
                        <div className="relative">
                            <img
                                className="h-32 w-32 md:w-40 md:h-40 rounded-full shadow-xl border-4 border-white"
                                src={user?.photoURL}
                                alt={user?.displayName}
                            />
                            <div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2 border-2 border-white shadow-md">
                                <MdOutlineEmail className="text-white" />
                            </div>
                        </div>
                        <p className="mt-4 text-2xl font-semibold text-gray-800">{user?.displayName}</p>
                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                            <MdOutlineEmail className="text-xl text-indigo-500" />
                            {user?.email}
                        </p>
                        <button className="mt-4 bg-[#0677A1] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:bg-transparent hover:text-[#0677A1]" onClick={() => document.getElementById('my_modal_4').showModal()}>Update Profile</button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <UpdateProfile />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="md:w-2/3 text-center md:text-left px-4">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome to Contest Craze!</h2>
                        <p className="mt-4 text-lg text-gray-700">
                            At Contest Craze, we believe in the power of creativity and the potential within every individual. As a user, this is your hub to explore, participate in contests, and showcase your unique talents. Dive into a world of creativity, connect with like-minded individuals, and let your imagination run wild. Enjoy your journey with Contest Craze!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-around w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-6">
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-semibold mb-4">Winning Contests</h3>
                    {barChart}
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-xl font-semibold mb-4">Contest Participation</h3>
                    {pieChart}
                </div>
            </div>
        </div>


    );
};

export default MyProfile;