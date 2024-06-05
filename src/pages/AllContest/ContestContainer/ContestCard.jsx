import 'animate.css';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ContestCard = ({ contest }) => {
    const { name, image, description } = contest;
    return (
        <div className="card bg-base-100 shadow-xl border-2">
            <div className="relative group">
                <figure className="overflow-hidden h-64"><img className="h-full w-full rounded-t-xl hover:scale-150 transition duration-500 cursor-pointer object-cover" src={image} alt="" /></figure>
                <h3
                    className="absolute bottom-0 text-xl font-bold text-white bg-[#0677A1] p-6 w-full hidden group-hover:flex animate__animated animate__zoomIn"
                >
                    A way of feeling
                </h3>
            </div>

            <div className="card-body">
                <div className='h-[70px]'>
                    <h2 className="card-title text-2xl font-bold">
                        {name}
                    </h2>
                </div>
                <p className='h-16'>{description}</p>
                <button className="flex btn bg-transparent text-[#0677A1] border-0 font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                    View Details
                    <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                        <MdKeyboardDoubleArrowRight />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ContestCard;