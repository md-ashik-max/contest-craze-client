import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import clsx from 'clsx';
import { FaChevronDown } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SectionTitle from "../../../components/SectionTitle";
import { useLoaderData } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateContest = () => {

    const { name, category, price, prizeMoney, deadline, description, instruction, _id } = useLoaderData()
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data)
        if (res.data.success) {
            const contest = {
                name: data.name,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                category: data.category,
                description: data.description,
                prizeMoney: data.prizeMoney,
                instruction: data.instruction,
                deadline: selectedDate !== null ? selectedDate.toISOString().split('T')[0] : deadline,
                creatorName: user?.displayName,
                creatorEmail: user?.email,
                creatorPhoto: user?.photoURL
            }
            // console.log(contest)
            const contestRes = await axiosSecure.patch(`/contests/update/${_id}`, contest)
            // console.log(contestRes.data)
            if (contestRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    title: "Good Job!",
                    text: `${data.name} successfully updated the contests.`,
                    icon: "success"
                });
            }

        }

    };

    return (
        <div>
            <SectionTitle title={"Update Your Contest Now"} description={"Easily update a contest, define the challenge, and watch submissions come in."}></SectionTitle>
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* contest name */}
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Contest Name</span>
                            </div>
                            <input defaultValue={name} type="text" {...register("name", { required: true })} placeholder="Contest Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="md:flex gap-6">
                        {/* category */}

                        <div className="w-full max-w-md mt-3">
                            <div className="mb-4">
                                <label className="text-sm font-medium" htmlFor="category">Contest Category</label>
                                <div className="relative mt-2">
                                    <select
                                        defaultValue={category}
                                        {...register("category", { required: true })}
                                        className={clsx(
                                            'w-full appearance-none rounded-lg border bg-white p-3 text-sm',
                                            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white',
                                            'text-black'
                                        )}
                                        id="category"
                                    >
                                        <option value="Image Design Contests">Image Design Contests</option>
                                        <option value="Article Writing">Article Writing</option>
                                        <option value="Marketing Strategy">Marketing Strategy</option>
                                        <option value="Digital advertisement Contests">Digital advertisement Contests</option>
                                        <option value="Gaming Review">Gaming Review</option>
                                        <option value="Book Review">Book Review</option>
                                        <option value="Business Idea Contests">Business Idea Contests</option>
                                        <option value="Movie Review">Movie Review</option>
                                    </select>
                                    <FaChevronDown
                                        className="pointer-events-none absolute top-4 right-2.5"
                                        aria-hidden="true"
                                    />
                                </div>
                                {errors.category && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                            </div>
                        </div>

                        {/* price */}

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="text" defaultValue={price} {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                        </label>

                    </div>
                    <div className="md:flex gap-6">
                        {/* prize money */}
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Prize money</span>
                            </div>
                            <input defaultValue={prizeMoney} type="text" {...register("prizeMoney", { required: true })} placeholder="Price Money" className="input input-bordered w-full" />
                        </label>
                        {/* contest deadline */}
                        <div className="form-control w-full">
                            <label htmlFor="date">Select Date</label>
                            <DatePicker
                                className='border-2 p-3 w-full mt-2 rounded-lg'
                                id="date"
                                selected={selectedDate|| deadline}
                                onChange={handleDateChange}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="MM/DD/YYYY"
                            />
                        </div>

                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Submission Instruction</span>
                            </div>
                            <textarea defaultValue={instruction} className="textarea textarea-bordered h-24" {...register("instruction", { required: true })} placeholder="Task Submission text instruction"></textarea>
                        </label>
                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Contest Details</span>
                            </div>
                            <textarea defaultValue={description} className="textarea textarea-bordered h-24" {...register("description", { required: true })} placeholder="Contest Details"></textarea>
                        </label>
                    </div>
                    <div>
                        <input type="file" {...register("image" , { required: true })} className="file-input file-input-bordered w-full" />
                    </div>

                    <div>
                        <button className="btn btn-outline btn-info flex gap-4 w-full text-lg px-16">Update Contest</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default UpdateContest;