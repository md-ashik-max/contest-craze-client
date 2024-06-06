import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: `${user.name} is now admin`,
                        text: "You clicked the button!",
                        icon: "success"
                    });
                }
            })

    }

    const handleMakeCreator = user => {
        axiosSecure.patch(`/users/creator/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: `${user.name} is now creator`,
                        text: "You clicked the button!",
                        icon: "success"
                    });
                }
            })

    }

    const handleDeleteUser = id => {
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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0)
                            refetch()
                        swalWithBootstrapButtons.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
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
            <SectionTitle title={"Manage Your User"} description={"Edit, and manage user profiles. Update account settings, security features, and communication preferences. "}></SectionTitle>

            <div className="my-6">
                <h1 className="text-2xl font-bold text-center">Total User: {users.length}</h1>
                <div className="overflow-x-auto overflow-y-hidden my-8 rounded-t-2xl">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#0677A1] text-white lg:text-lg">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="lg:text-xl">
                            {
                                users.map((user, index) => (
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user?.role === 'admin' || user?.role === 'creator' ? (
                                                <span className="text-[#0677A1] text-[16px] font-bold">
                                                    {user?.role === 'admin' ? 'Admin' : 'Creator'}
                                                </span>
                                            ) : (
                                                <div className="dropdown dropdown-left">
                                                    <div tabIndex={0} role="button" className="btn m-1 text-[#0677A1] border-[#0677A1]">
                                                        <FaUsers />
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <button
                                                                onClick={() => handleMakeAdmin(user)}
                                                                className="text-[#0677A1] border-[#0677A1] font-bold">
                                                                Admin
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button
                                                                onClick={() => handleMakeCreator(user)}
                                                                className="text-[#0677A1] border-[#0677A1] font-bold">
                                                                Creator
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="btn border-[#B91C1C] text-[#B91C1C]">
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default ManageUsers;