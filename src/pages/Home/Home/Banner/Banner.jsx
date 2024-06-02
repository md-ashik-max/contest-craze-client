import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
        {
            img: 'https://i.ibb.co/h2wJSgk/banner-img1.jpg',
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            img: 'https://i.ibb.co/xSz4YXM/vietnam-spot.jpg',
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            img: 'https://i.ibb.co/7pv1jW5/gulshan.jpg',
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
        },
        {
            img: 'https://i.ibb.co/PGZZ9Ld/woman-feeding-colorful-fish-pond-tirta-gangga-water-palace-bali-indonesia.jpg',
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            des: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
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
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        <div className="w-full h-full bg-slate-500">
                            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-white max-w-4xl">
                                <div className="font-bold tracking-wide">{item.author}</div>
                                <div className="text-5xl font-bold leading-tight">{item.title}</div>
                                <div className="text-5xl font-bold text-[#E64398]">{item.topic}</div>
                                <div className="mt-4">{item.des}</div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
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

            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
                {items.map((item, index) => (
                    <div key={index} className="relative">
                        <img
                            src={item.img}
                            alt={item.title}
                            className={`w-36 h-56 object-cover rounded-lg transition-transform duration-500 ease-in-out ${index === currentIndex ? 'transform scale-110' : ''
                                }`}
                        />
                        <div className="absolute bottom-4 left-2 right-2 text-white">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm">{item.des}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-6 right-1/2 transform translate-x-1/2 flex space-x-4 z-10">
                <button onClick={prevSlide} className="btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white">
                    <FaArrowLeft></FaArrowLeft>
                </button>
                <button onClick={nextSlide} className="btn w-12 h-12 rounded-full bg-[#0677A1] hover:text-[#0677A1] font-bold hover:bg-white text-white">
                    <FaArrowRight></FaArrowRight>
                </button>
            </div>
        </div>
    );
};

export default Banner;