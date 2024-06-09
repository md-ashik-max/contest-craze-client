import useAuth from "../../../hooks/useAuth";
import { MdOutlineEmail } from "react-icons/md";


const CreatorHome = () => {
    const { user } = useAuth()
    return (

        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#0677A1] to-[#1E90FF] p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-r from-[#1E90FF] to-[#0677A1] p-6 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-2">Now You are Creator at Contest Craze</h1>
                </div>
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="flex flex-col items-center md:w-1/3 mb-8 md:mb-0">
                        <div className="relative">
                            <img
                                className="h-32 w-32 md:w-40 md:h-40 rounded-full shadow-xl border-4 border-white"
                                src={user.photoURL}
                                alt={user.displayName}
                            />
                            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-2 border-white shadow-md">
                                <MdOutlineEmail className="text-white" />
                            </div>
                        </div>
                        <p className="mt-4 text-2xl font-semibold text-gray-800">{user.displayName}</p>
                        <p className="flex items-center gap-2 mt-2 text-gray-600">
                            <MdOutlineEmail className="text-xl text-blue-500" />
                            {user.email}
                        </p>
                    </div>
                    <div className="md:w-2/3 text-center md:text-left px-4">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome to Contest Craze!</h2>
                        <p className="mt-4 text-lg text-gray-700">
                            At Contest Craze, we believe in the power of creativity and the potential within every individual.
                            As a creator, this is your hub to manage, showcase, and share your unique talents with the world.
                            Explore incredible works from talented participants across various contests, get inspired by unique
                            expressions of creativity, and vote for your favorites. Discover the next big talent with Contest Craze!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorHome;