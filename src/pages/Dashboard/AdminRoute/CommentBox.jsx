import { useForm } from "react-hook-form";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";




const CommentBox = ({id,refetch}) => {
    // console.log(id)
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = data => {
        const comment = data.comment;
        axiosSecure.patch(`/contests/adminComment/${id}`,{comment:comment})
        .then(res => {
            // console.log(res.data)
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: `Successfully give comment`,
                    text: "You clicked the button!",
                    icon: "success"
                });
                reset();
                refetch();
            }
        })
       
    };
    return (
        <div className="my-24 mx-auto md:w-1/2 bg-[#EDF7FA] p-4 rounded-xl text-center">
            <h5 className="text-2xl font-bold">Leave a comment</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="animate__animated animate__fadeInUp form-control">
                    <label className="label">
                        <span className="label-text">Comment</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Comment"
                        name="comment"
                        className="input input-bordered"
                        {...register("comment", { required: true })}
                    />
                    {errors.comment && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="animate__animated animate__fadeInUp form-control mt-6">
                    <button
                        className="btn bg-[#0677A1] font-extrabold text-white border border-[#0677A1] hover:text-[#0677A1] hover:bg-white hover:border-[#0677A1]"
                    >
                        Submit
                    </button>
                </div>
            </form>
           
        </div>
    );
};

export default CommentBox;