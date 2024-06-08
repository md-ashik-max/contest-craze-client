import { FaComment, FaTrashAlt } from "react-icons/fa";
import useAllContest from "../../../hooks/useAllContest";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ManageContest = () => {
    const [allContest, , refetch] = useAllContest();
    const axiosSecure = useAxiosSecure()


    const handleConfirmContest = item => {
        axiosSecure.patch(`/contests/${item._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: `${item.name} is now confirm to display`,
                        text: "You clicked the button!",
                        icon: "success"
                    });
                }
            })

    }


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
        <div>
            <SectionTitle title={" Manage Your Contests"} description={"Easily access and Update details and manage submissions (if applicable) to ensure smooth contest execution."}></SectionTitle>

            <div>
                <h1 className="text-2xl font-bold text-center">Total Contest : {allContest.length}</h1>
                <div className="overflow-x-auto my-8 rounded-t-2xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0677A1] text-white">
                            <tr className="text-xl font-bold text-white">
                                <th>#</th>
                                <th>Contest Image</th>
                                <th>Contest Name</th>
                                <th>Price</th>
                                <th>Action</th>
                                <th>Action</th>
                                <th>Action</th>
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
                                        <td>${item.price}</td>
                                        <th>
                                            {
                                                item?.status === 'success' ? <p className="text-green-600 font-bold">Confirmed</p>
                                                    :
                                                    <button
                                                        onClick={() => handleConfirmContest(item)}
                                                        className="btn m-1 text-[#0677A1] border-[#0677A1]">
                                                        Please Confirm
                                                    </button>
                                            }
                                        </th>
                                        <th>
                                            <button
                                                className="btn m-1 text-[#0677A1] border-[#0677A1]">
                                                <FaComment></FaComment>
                                            </button>
                                        </th>
                                        <th>
                                            <button
                                                onClick={() => handleDeleteContest(item._id)}
                                                className="btn border-[#B91C1C]  text-[#B91C1C]">
                                                <FaTrashAlt></FaTrashAlt>
                                            </button>
                                        </th>
                                    </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageContest;