import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddContest = () => {

    const{user}=useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure=useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

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
            const menuItem = {
                name: data.name,
                image: res.data.data.display_url,
                price: parseFloat(data.price),
                category: data.category,
                recipe: data.recipe,
                creatorName:user?.displayName,
                creatorEmail:user?.photoURL
            }
            const menuRes = await axiosSecure.post('/contests', menuItem)
            // console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    title: "Good Job!",
                    text: `${data.name} successfully added the contests.`,
                    icon: "success"
                });
            }

        }

    };
    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* recipe name */}
                    <div>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Name</span>
                            </div>
                            <input type="text" {...register("name", { required: true })} placeholder="Recipe Name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="flex gap-6">
                        {/* category */}

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Recipe Name</span>
                            </div>
                            <select defaultValue="default"
                                {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select Your Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* price */}

                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input type="text" {...register("price", { required: true })} placeholder="Price" className="input input-bordered w-full" />
                        </label>

                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Recipe Details</span>
                            </div>
                            <textarea className="textarea textarea-bordered h-24" {...register("recipe", { required: true })} placeholder="Recipe Details"></textarea>
                        </label>
                    </div>
                    <div>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
                    </div>

                    <div>
                        <button className="btn btn-outline btn-info flex gap-4 text-lg px-16">Add Contest</button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default AddContest;