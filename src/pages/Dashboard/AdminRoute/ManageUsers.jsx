import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


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
    return (
        <div>
            <div className="flex justify-evenly">
                <h2 className="lg:text-3xl font-bold">User</h2>
                <h2 className="lg:text-3xl font-bold">All User : {users.length}</h2>
            </div>
            <div className="my-6 lg:my-24">
                <div className="overflow-x-auto rounded-t-3xl">
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
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user?.role === 'admin' || user?.role === 'creator' ? (
                                            <span className="text-[#0677A1] text-[16px] font-bold">{user?.role === 'admin' ? 'Admin' : 'Creator'}</span>
                                        ) : (
                                            <div className="dropdown dropdown-left">
                                                <div tabIndex={0} role="button" className="btn m-1 text-[#0677A1] border-[#0677A1]"><FaUsers></FaUsers></div>
                                                <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><button 
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="text-[#0677A1] border-[#0677A1] font-bold">Admin</button></li>
                                                    <li><button className="text-[#0677A1] border-[#0677A1] font-bold">Creator</button></li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            // onClick={() => handleDeleteUser(user._id)}
                                            className="btn border-[#B91C1C]  text-[#B91C1C]">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
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

export default ManageUsers;