import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMemo } from "react";


const LeaderBoard = () => {
    const axiosPublic = useAxiosPublic()
    const { data: winners = [], isLoading, error } = useQuery({
        queryKey: ['winners'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/submitContest/contestWinner/winner`);
            return res.data;
        }
    });

    const userWins = useMemo(() => {
        const wins = {};

        winners.forEach(winner => {
            if (winner.contestWinner === 'winner') {
                const userEmail = winner.participantEmail;
                const userName = winner.participantName;
                const userPhoto = winner.participantPhoto;

                if (!wins[userEmail]) {
                    wins[userEmail] = {
                        name: userName,
                        email: userEmail,
                        photo: userPhoto,
                        wins: 0
                    };
                }

                wins[userEmail].wins += 1;
            }
        });

        return Object.values(wins).sort((a, b) => b.wins - a.wins);
    }, [winners]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    return (
        <div className="container mx-auto p-8 mb-28 max-w-7xl shadow-2xl rounded-xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-[#0677A1]">Top Contest Winners</h2>
               
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-1 bg-[#0677A1]"></div>
                    <div className="w-16 h-1 bg-[#0677A1]"></div>
                </div>
                <p className="text-gray-600 text-lg mt-6 mb-6">
                    Meet the top contest winners who have shown outstanding performance and creativity in our contests.
                </p>
            </div>
            <div className="relative">
                <div className="px-4 md:px-24">
                    {userWins.length > 0 ? (
                        <ul className="space-y-4">
                            {userWins.map((user, index) => (
                                <li
                                    key={user.email}
                                    className={`flex items-center p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${index === 0 ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-white'
                                        }`}
                                >
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#0677A1] text-white text-xl font-bold mr-4">
                                        {index + 1}
                                    </div>
                                    <div className="relative">
                                        <img
                                            className={`w-16 h-16 rounded-full border-4 ${index === 0 ? 'border-yellow-500' : 'border-[#0677A1]'
                                                }`}
                                            src={user.photo}
                                            alt={user.name}
                                        />
                                        {index === 0 && (
                                            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-bold">
                                                Leader
                                            </span>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-2xl font-bold text-[#0677A1]">{user.name}</h3>
                                        <p className="text-gray-700">Wins: {user.wins}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">No winners yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeaderBoard;