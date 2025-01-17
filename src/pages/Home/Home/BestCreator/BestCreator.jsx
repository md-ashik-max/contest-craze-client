import { useEffect, useRef, useState, useMemo } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useAllContest from '../../../../hooks/useAllContest';

const BestCreator = () => {
    const swiperRef = useRef(null);
    const [allContest] = useAllContest();

    const sortedCreators = useMemo(() => {
        return [...allContest].sort((a, b) => b.participants - a.participants).slice(0, 5);
    }, [allContest]);

    const [topCreators, setTopCreators] = useState(sortedCreators);

    useEffect(() => {
        setTopCreators(sortedCreators);
    }, [sortedCreators]);

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
        <div className="container max-w-7xl lg:mx-auto py-8 mb-28">
            <div className="text-center">
                <h2 className="text-4xl font-bold font-roboto text-center mb-8">Top Contest Creators</h2>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img className="w-12" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                    <img className="w-16" src="https://i.ibb.co/2sFHBqw/line-thin.png" alt="" />
                </div>
                <p>Meet our top contest creators: John Doe, Jane Smith, and Emily Johnson, leading the way in art, <br />photography, and coding challenges with their innovative and engaging contests.</p>
            </div>
            <div className='relative mt-12'>
                <div className='md:px-24'>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        lazy="true"
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                className: 'small-device',
                            },
                            640: {
                                slidesPerView: 2,
                                className: 'medium-device',
                            },
                            1024: {
                                slidesPerView: 3,
                                className: 'large-device',
                            },
                        }}
                    >
                        {
                            topCreators.map(creator => (
                                <SwiperSlide key={creator._id}>
                                    <div className="card border-2 bg-base-100">
                                        <figure><img className='w-40 h-40 rounded-full' src={creator.creatorImage} alt="Creator" /></figure>
                                        <div className="card-body text-center">
                                            <h2 className="text-2xl font-bold">{creator.creatorName}</h2>
                                            <h5 className='text-lg font-bold h-16'>Contest : {creator.name}</h5>
                                            <p>{creator.description.slice(0, 50)}...</p>
                                            <p>Participants: {creator.participants}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
                <div className='md:absolute w-full flex md:justify-between justify-center gap-6 mt-4 top-1/2'>
                    <div>
                        <button className='btn w-12 h-12 rounded-full border-[#0677A1] border-dashed bg-transparent hover:bg-[#0677A1] text-[#0677A1] font-bold hover:text-white' onClick={handlePrev}><FaArrowLeft /></button>
                    </div>
                    <div>
                        <button className='btn w-12 h-12 rounded-full border-[#0677A1] border-dashed bg-transparent hover:bg-[#0677A1] text-[#0677A1] font-bold hover:text-white' onClick={handleNext}><FaArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestCreator;
