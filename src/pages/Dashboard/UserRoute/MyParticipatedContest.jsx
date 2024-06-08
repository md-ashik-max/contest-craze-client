import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyParticipatedContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const { data: myParticipatedContest = [] } = useQuery({
        queryKey: ['myParticipatedContest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        },
    });

    const [showModal, setShowModal] = useState(false);
    const [currentContest, setCurrentContest] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contestLink = e.target.elements.contestLink.value;
        if (contestLink) {
            const submitContest = {
                submitLink: contestLink,
                participantName: user?.displayName,
                participantEmail: user?.email,
                participantPhoto: user?.photoURL,
                contestName: currentContest?.contestName,
            };
          const res=await axiosSecure.post('/submitContest',submitContest)
        //   console.log(res.data)
        if(res.data.insertedId){


            axiosPublic.patch(`/payments/submitted/${currentContest?._id}`)
                .then(res => {
                    if (res.data.modifiedCount > 0) {
                        toast.success("Successfully joined the contest!");
                        setShowModal(false);
                    }
                })
        }
        }
    };

    const handleOpenModal = (contest) => {
        setCurrentContest(contest);
        setShowModal(true);
    };

    return (
        <div>
            <SectionTitle
                title={"My Participated Contest"}
                description={
                    "Showcasing creativity and talent, this section highlights all the contests I've participated in, featuring diverse challenges such as image design, marketing strategy, and more, along with my achievements and experiences."
                }
            ></SectionTitle>
            <div>
                <div className="my-6 lg:my-24">
                    <h3 className="text-2xl font-bold text-center">
                        My Participate Contest : {myParticipatedContest.length}
                    </h3>
                    <div className="overflow-x-auto rounded-t-3xl mt-6">
                        <table className="table">
                            <thead className="bg-[#0677A1] text-white lg:text-lg">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Contest Name</th>
                                    <th>Payment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="lg:text-xl">
                                {myParticipatedContest.map((contest, index) => (
                                    <tr key={contest._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={contest.contestImage} alt="Contest" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{contest.contestName}</td>
                                        <td>
                                            <p className="text-green-600 font-bold">Successful</p>
                                        </td>
                                        <td>
                                           {contest?.contestSubmit==="success"?
                                           <p className="text-green-600 font-bold">
                                            Already Submit
                                           </p> 
                                           
                                           :
                                           <button
                                                className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group"
                                                onClick={() => handleOpenModal(contest)}
                                            >
                                                Submit
                                                <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                                                    <FaAngleDoubleRight />
                                                </span>
                                            </button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showModal && (
                    <dialog
                        open
                        className="modal flex items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50"
                    >
                        <div className="modal-box w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-center mb-4">
                                Submit Your Contest Link
                            </h2>
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <label className="mb-2 text-lg font-medium" htmlFor="contestLink">
                                    Contest Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="Please input your contest URL"
                                    className="input input-bordered p-2 mb-4 border rounded-md"
                                    id="contestLink"
                                    name="contestLink"
                                    required
                                />
                                <button
                                    className="btn m-1 bg-[#0677A1] text-white my-4 p-2 rounded-md hover:bg-[#055a80] transition-all duration-200"
                                    type="submit"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn m-1 bg-transparent text-[#0677A1] border-[#0677A1] p-2 rounded-md border hover:bg-[#0677A1] hover:text-white transition-all duration-200"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </dialog>
                )}
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyParticipatedContest;
