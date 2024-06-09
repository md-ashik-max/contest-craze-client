import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyCreatedContest = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: myCreatedContests = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contests/creator/${user?.email}`)
            return res.data
        }
    })

    const handleDeleteContest = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(id)
                axiosSecure.delete(`/contests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }

                    })


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }

    return (
        <div className="shadow-2xl p-12 rounded-xl">
            <SectionTitle title={"Manage all the contests you launched"} description={" Track & manage contests you created. View & edit your running competitions"}></SectionTitle>
            <div className="my-6 lg:my-24">
                <h3 className="text-2xl font-bold text-center">My Created Contest : {myCreatedContests.length}</h3>
                <div className="overflow-x-auto rounded-t-3xl mt-6">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0677A1] text-white lg:text-lg">
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="lg:text-xl">

                            {
                                myCreatedContests.map((contest, index) => <tr key={contest._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={contest.image} alt="" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>{contest.name}</td>
                                    <td>
                                        {
                                            contest.status === 'success' ? <p className="text-green-600 font-bold">Accepted</p>
                                                :
                                                <p className="text-[#0677A1] font-bold">Pending</p>

                                        }
                                    </td>
                                    <td>
                                        {
                                            contest.status === 'success' ? <button disabled className="btn m-1 text-[#0677A1] border-[#0677A1]"><FaEdit></FaEdit></button>
                                                :
                                                <Link to={`/dashboard/updateContest/${contest._id}`}>
                                                    <button className="btn m-1 text-[#0677A1] border-[#0677A1]"><FaEdit></FaEdit></button>
                                                </Link>

                                        }
                                    </td>
                                    <td>
                                        {
                                            contest.status === 'success' ? <button disabled className="btn border-[#B91C1C]  text-[#B91C1C]">
                                                <FaTrashAlt></FaTrashAlt></button>
                                                :
                                                <button
                                                    onClick={() => handleDeleteContest(contest._id)}
                                                    className="btn border-[#B91C1C]  text-[#B91C1C]">
                                                    <FaTrashAlt></FaTrashAlt>
                                                </button>

                                        }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyCreatedContest;