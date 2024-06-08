import SectionTitle from "../../../components/SectionTitle";
import useAllContest from "../../../hooks/useAllContest";


const SubmittedContest = () => {
    const [allContest, , ] = useAllContest();
    return (
        <div>
            <SectionTitle title={"Submitted Contests"} description={"Welcome to the Submitted Contests section! Here, you can view all the contests that have been submitted. "}></SectionTitle>
            <div className="overflow-x-auto my-8 rounded-t-2xl">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#0677A1] text-white">
                        <tr className="text-xl font-bold text-white">
                            <th>#</th>
                            <th>Contest Image</th>
                            <th>Contest Name</th>
                            <th>Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allContest.map((item, index) =>
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.prizeMoney}</td>
                                   
                                </tr>)
                        }
                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default SubmittedContest;