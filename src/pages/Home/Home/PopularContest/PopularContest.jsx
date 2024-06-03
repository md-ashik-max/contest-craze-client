// import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/pagination';

import 'swiper/css';
// import { Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const PopularContest = () => {
    const swiperRef = useRef(null);
    const [contests, setContests] = useState([]);

    useEffect(() => {
        fetch('/popularContest.json')
            .then(res => res.json())
            .then(data => setContests(data))
    }, [])

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
                <h2 className="text-4xl font-bold font-roboto my-3">OUR RUNNING <span className="text-[#E64398]">CONTESTS</span></h2>
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
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                // modules={[Pagination]}
                // className="mySwiper"
                >
                    {
                        contests.map(contest => <SwiperSlide key={contest.id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>

                                <div className="card-body">
                                    <div className='flex justify-between'>
                                        <p>Start: {contest.startDate}</p>
                                        <p>End: {contest.endDate}</p>
                                    </div>
                                    <h2 className="card-title">
                                        {contest.name}
                                        <div className="badge badge-secondary">{contest.status}</div>
                                    </h2>
                                    <p>{contest.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }


                </Swiper>

            </div>
            <div className='flex justify-center items-center mt-6'>
                <Link>
                    <button className='btn bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white'>Show All</button>
                </Link>
            </div>

        </div>
    );
};

export default PopularContest;