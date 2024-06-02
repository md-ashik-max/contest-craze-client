import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import error from './Animation - 1717308875103.json';
import { FaArrowLeft } from "react-icons/fa";


const ErrorPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mb-24">
        <div className="max-w-5xl mx-auto">
            <Lottie animationData={error}></Lottie>
        </div>
        <div className='flex flex-col justify-center items-center space-y-4 -mt-24'>
            <h3 className="text-3xl font-bold">Opps, looks like the page is lost.</h3>
            <p>This is not a fault , just an accident that was not intentional.</p>
            <Link to='/'>
                <button className="btn text-lg font-bold text-[#E64398] bg-transparent border-2 border-[#E64398] hover:text-white hover:bg-[#E64398]"><FaArrowLeft></FaArrowLeft> Back to Home</button>
            </Link>
        </div>

    </div>
    );
};

export default ErrorPage;