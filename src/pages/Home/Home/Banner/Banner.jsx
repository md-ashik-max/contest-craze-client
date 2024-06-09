import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'animate.css';

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        {
            img: 'https://i.ibb.co/h2wJSgk/banner-img1.jpg',
            title: 'Unleash Your Creativity',
            topic: 'Contest',
            des: 'Join a vibrant community of creators and showcase your talent in art and more...',
        },
        {
            img: 'https://i.ibb.co/LvHv2WH/slider-img2.jpg',
            title: 'Compete and Win',
            topic: 'Contest',
            des: 'Compete with passionate individuals and stand a chance to win fantastic rewards...',
        },
        {
            img: 'https://i.ibb.co/2cmdjjP/27526.jpg',
            title: ' Discover New Talents',
            topic: 'Contest',
            des: 'Explore incredible works from talented participants across various contests...',
        },
        {
            img: 'https://i.ibb.co/h9mbfvY/slider-img4.jpg',
            title: ' Join the Craze',
            topic: 'Contest',
            des: ' Join the Craze today and let your imagination run wild at Contest Craze!...',
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const autoPlayRef = useRef();

    useEffect(() => {
        autoPlayRef.current = nextSlide;
    });

    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };
        const interval = setInterval(play, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[600px] md:h-[700px] lg:h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        <div className="w-full h-full bg-black bg-opacity-50">
                            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 max-w-4xl text-center px-4 md:px-0">
                                <div className="text-2xl md:text-5xl font-bold leading-tight text-white animate__animated animate__slideInUp">{item.title}</div>
                                <div className="text-xl md:text-3xl font-bold text-[#E64398] animate__animated animate__slideInUp">{item.topic}</div>
                                <div className="mt-4 text-white">{item.des}</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate__animated animate__backInDown">
                                    <button onClick={prevSlide} className="btn bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white">
                                        SEE MORE
                                    </button>
                                    <button className="btn py-2 px-4 border border-[#0677A1] text-[#0677A1]">SUBSCRIBE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden md:flex space-x-4 z-10">
                {items.map((item, index) => (
                    <div key={index} className="relative">
                        <img
                            src={item.img}
                            alt={item.title}
                            className={`w-24 md:w-36 h-36 md:h-56 object-cover rounded-lg transition-transform duration-500 ease-in-out ${index === currentIndex ? 'transform scale-110' : ''
                                }`}
                        />
                        <div className="absolute bottom-4 left-2 right-2 text-white text-sm md:text-base">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-xs md:text-sm">{item.des}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 right-1/2 transform translate-x-1/2 flex space-x-4 z-10">
                <button onClick={prevSlide} className="btn w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white">
                    <FaArrowLeft></FaArrowLeft>
                </button>
                <button onClick={nextSlide} className="btn w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white">
                    <FaArrowRight></FaArrowRight>
                </button>
            </div>
        </div>
    );
};

export default Banner;
