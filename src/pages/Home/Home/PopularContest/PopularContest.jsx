// import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/pagination';

import 'swiper/css';
// import { Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDoubleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Countdown from '../../../../components/Countdown';
import useAllContest from '../../../../hooks/useAllContest';


const PopularContest = () => {
    const swiperRef = useRef(null);
    const [contests, setContests] = useState([]);
    const [allContest] = useAllContest();


    useEffect(() => {

        if (allContest && allContest.length > 0) {
            const sortedContest = [...allContest].sort((a, b) => b.participants - a.participants).slice(0, 6);
            setContests(sortedContest);
        }
    }, [allContest])

    const handleNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handlePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-28">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-roboto my-3">OUR POPULAR <span className="text-[#E64398]">CONTESTS</span></h2>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img className="w-12" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                    <img className="w-16" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                </div>
                <p className="mt-3">Join our exciting contest now! Showcase your creativity and win amazing prizes. <br /> Do not miss this chance to shine. Enter today and let your talents be recognized!</p>

            </div>
            <div className='flex justify-between items-center my-8'>
                <div>
                    <h3 className='text-3xl font-bold'>Running Contests</h3>
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="divider"></div>
                </div>
                <div className='flex gap-4'>
                    <button className='btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white' onClick={handlePrev}><FaArrowLeft></FaArrowLeft></button>
                    <button className='btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white' onClick={handleNext}><FaArrowRight></FaArrowRight></button>
                </div>

            </div>
            <div>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={30}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 2,
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {
                        contests.map(contest => <SwiperSlide key={contest._id}>
                            <div className="card bg-base-100 shadow-xl border-2">
                                <div className="relative group">
                                    <figure className="overflow-hidden h-64"><img className="h-full w-full rounded-t-xl hover:scale-150 transition duration-500 cursor-pointer object-cover" src={contest.image} alt="" /></figure>
                                    <h3
                                        className="absolute bottom-0 text-xl font-bold text-white bg-[#0677A1] p-6 w-full hidden group-hover:flex animate__animated animate__zoomIn"
                                    >
                                        A way of feeling
                                    </h3>
                                </div>

                                <div className="card-body">
                                    <p className='font-bold'>Total Participants:{contest.participants}</p>
                                    <div className='h-[70px]'>
                                        <h2 className="card-title text-2xl font-bold">
                                            {contest.name}
                                        </h2>
                                    </div>

                                    <p className='h-16'>{contest.description}</p>
                                    <Countdown deadline={contest.deadline}></Countdown>
                                    <Link to={`/contestDetails/${contest._id}`}>
                                        <button className="flex btn w-full bg-transparent text-[#0677A1] border-0 font-bold hover:bg-[#0677A1] hover:text-white items-center gap-2 group">
                                            View Details
                                            <span className="hidden group-hover:flex text-xl animate__animated animate__fadeInLeft">
                                                <FaAngleDoubleRight />
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }


                </Swiper>

            </div>
            <div className='flex justify-center items-center mt-6'>
                <Link to='/allContest'>
                    <button className='btn bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white'>Show All</button>
                </Link>
            </div>

        </div>
    );
};

export default PopularContest;