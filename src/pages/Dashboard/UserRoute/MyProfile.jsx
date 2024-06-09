import { useMemo } from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";
import { MdOutlineEmail } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateProfile from "./UpdateProfile";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ backgroundColor: "white", padding: "5px" }}>
                <p>{`Name: ${data.name}`}</p>
                <p>{`Value: ${payload[0].value.toFixed(2)}%`}</p>
            </div>
        );
    }
    return null;
};

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: mySubmitContest = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["myParticipatedContest", user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error("User email is not available");
            }
            const res = await axiosSecure.get(`/submitContest/byEmail/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // only run the query if the user email is available
    });

    const participationData = useMemo(() => {
        const total = mySubmitContest.length;
        const wins = mySubmitContest.filter(
            (contest) => contest.contestWinner === "winner"
        ).length;
        const winPercentage = (wins / total) * 100;
        const losePercentage = 100 - winPercentage;

        return [
            { name: "Winning Percentage", value: winPercentage, fill: "#4caf50" }, // Green for wins
            { name: "Losing Percentage", value: losePercentage, fill: "#f44336" }, // Red for losses
        ];
    }, [mySubmitContest]);

    const pieChart = useMemo(
        () => (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={participationData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        ),
        [participationData]
    );

    if (isLoading) {
        return (
            <div className="max-h-screen flex justify-center items-center">
                <span className="loading loading-spinner text-secondary"></span>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-[#0677A1] to-[#1E90FF] py-24">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-[#1E90FF] to-[#0677A1] p-6 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        User Profile at Contest Craze
                    </h1>
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
                        <p className="mt-4 text-2xl font-semibold text-gray-800">
                            {user?.displayName}
                        </p>
                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                            <MdOutlineEmail className="text-xl text-indigo-500" />
                            {user?.email}
                        </p>
                        <button
                            className="mt-4 bg-[#0677A1] text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:bg-transparent hover:text-[#0677A1]}"
                            onClick={() => document.getElementById("my_modal_4").showModal()}
                        >
                            Update Profile
                        </button>
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
                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome to Contest Craze!
                        </h2>
                        <p className="mt-4 text-lg text-gray-700">
                            At Contest Craze, we believe in the power of creativity and the
                            potential within every individual. As a user, this is your hub to
                            explore, participate in contests, and showcase your unique
                            talents. Dive into a world of creativity, connect with like-minded
                            individuals, and let your imagination run wild. Enjoy your journey
                            with Contest Craze!
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-around w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4">Winning Percentage</h3>
                {pieChart}
            </div>
        </div>
    );
};

export default MyProfile;
