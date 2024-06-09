
import SectionTitle from "../../../components/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyWinningContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myWinningContest = [], isLoading, isError } = useQuery({
        queryKey: ['myParticipatedContest', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error('User email is not available');
            }
            const res = await axiosSecure.get(`/submitContest/byEmail/${user.email}`);
            const winningContest = res.data.filter(contest => contest.contestWinner === 'winner');
            return winningContest;
        },
        enabled: !!user?.email, // only run the query if the user email is available
    });

    if (isLoading) {
        return <div className="max-h-screen flex justify-center items-center"><span className="loading loading-spinner text-secondary"></span></div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }
    return (
        <div className="shadow-2xl p-12 rounded-xl">
            <SectionTitle title={"My Winning Contest"} description={"Celebrate your victories! View all the contests you have won and relive the excitement of your achievements in the 'My Winning Contests' section. Keep striving for greatness!"}></SectionTitle>
            {myWinningContest.length === 0 ? (
                <div className="text-center">You have not won any contests.</div>
            ) : (
                <div className="overflow-x-auto my-8 rounded-t-2xl">
                    <h2 className="text-2xl font-bold">Contest Name : </h2>
                    <ul>
                        {myWinningContest.map((contest, index) => (
                            <li key={contest._id}>
                              <p className="flex gap-4 items-center">  <span>{index + 1} . </span>
                                {contest.contestName}</p>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MyWinningContest;