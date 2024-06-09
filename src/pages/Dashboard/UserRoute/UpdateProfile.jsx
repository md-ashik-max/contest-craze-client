
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";



const UpdateProfile = () => {
    const { user, updateUserProfile } = useAuth()


    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const onSubmit = data => {
        const fullName = data.fullName;
        const image = data.image;
        updateUserProfile(fullName, image)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Update User Information Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            reset()
           
        })
    }
    return (
        <div className="my-24 mx-auto md:w-1/2 bg-[#EDF7FA] p-12 rounded-xl text-center">
            <h2 className="text-3xl font-bold">Hi! {user.displayName}</h2>
            <img className="w-16 h-16 rounded-full mx-auto my-6" src={user.photoURL} alt="" />
            <p>{user.email}</p>
            <h5 className="text-2xl font-bold">Update your profile</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="animate__animated animate__fadeInUp form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" className="input input-bordered" {...register("fullName", { required: true })} />
                    {errors.fullName && <span className="text-red-500">This field is required</span>}
                </div>
                <div className=" animate__animated animate__fadeInUp form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" placeholder="Photo URL" name="photo" className="input input-bordered" {...register("image")} />
                </div>
                <div className="animate__animated animate__fadeInUp form-control mt-6">
                    <button className="btn bg-[#0677A1] font-extrabold text-white border border-[#0677A1] hover:text-[#0677A1] hover:bg-white hover:border-[#0677A1]">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;