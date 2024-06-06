import { Link, useLoaderData } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import Countdown from "../../../components/Countdown";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";


const ContestDetails = () => {
    const { name, image, deadline, description, price, prizeMoney, instruction } = useLoaderData();
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
                        <button className="flex btn w-52 bg-transparent text-[#0677A1] border-[#0677A1] border-dashed font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                            Register Now
                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                            <FaAngleDoubleRight />
                            </span>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ContestDetails;