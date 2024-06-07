import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import Countdown from "../../../components/Countdown";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const ContestDetails = () => {
    const { name, image, deadline, description, price, prizeMoney, instruction, _id} = useLoaderData();
    return (
        <div>
            <div>
                <img src="https://i.ibb.co/2c1dDC6/contests-banner-img.jpg" alt="" />
            </div>

            <div className="max-w-7xl mx-auto my-24">
                <div className="mb-6">
                    <Link to='/allContest'>
                        <button className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInRight">
                                <FaAngleDoubleLeft />
                            </span>
                            Back
                        </button>
                    </Link>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div>
                        <figure className="md:h-[550px]"><img className="w-full h-full" src={image} alt="Shoes" /></figure>
                    </div>
                    <div className="card-body">
                        <div className="md:flex justify-between">
                            <h2 className="card-title font-bold text-xl">
                                {name}
                            </h2>
                            <h5 className="font-bold text-[#0677A1]">Entry Fee : ${price}</h5>
                        </div>
                        <h5 className="flex items-center font-medium">End : <MdOutlineDateRange />{deadline}</h5>
                        <h5 className="font-bold">Description : </h5>
                        <p>{description}</p>
                        <h5 className="font-bold">Prize : ${prizeMoney}</h5>
                        <h5 className="font-bold"> Task Submission text instruction : </h5>
                        <p>{instruction}</p>
                        <Countdown deadline={deadline}></Countdown>
                        {/* <button className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                            Register Now
                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                                <FaAngleDoubleRight />
                            </span>
                        </button> */}
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group" onClick={() => document.getElementById('my_modal_4').showModal()}>open modal
                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                                <FaAngleDoubleRight />
                            </span>
                        </button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm
                                        price={price}
                                        id={_id}
                                    ></CheckoutForm>

                                </Elements>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContestDetails;