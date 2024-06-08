import { useLoaderData } from "react-router-dom";


const ContestParticipants = () => {
    const participants = useLoaderData();
    console.log(participants)
    return (
        <div>
            {(!participants || participants.length === 0) ? (
                <div className="text-xl font-bold text-center">No participants have submitted their contest.</div>
            ) : (
                <div className="overflow-x-auto my-8 rounded-t-2xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0677A1] text-white">
                            <tr className="text-xl font-bold text-white">
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Submitted Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                participants.map((participant, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={participant.participantPhoto} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {participant.participantName}
                                        </td>
                                        <td>
                                            {participant.participantEmail}
                                        </td>
                                        <td>{participant.submitLink}</td>
                                        <td>
                                            <button className="btn m-1 bg-transparent font-bold hover:bg-[#0677A1] hover:text-white text-[#0677A1] border-[#0677A1]"> Declare Win</button>
                                        </td>

                                    </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            )}
        </div>
    );
};

export default ContestParticipants;