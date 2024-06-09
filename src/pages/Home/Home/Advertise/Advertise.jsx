import { GiLaurelsTrophy } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';

const Advertise = () => {
  const axiosPublic = useAxiosPublic();

  const { data: totalEntries = [] } = useQuery({
    queryKey: ['totalEntries'],
    queryFn: async () => {
      const res = await axiosPublic.get('/payments');
      return res.data;
    }
  });

  const { data: winners = [] } = useQuery({
    queryKey: ['winners'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submitContest/contestWinner/winner`);
      return res.data;
    }
  });
  //     <div className="winner-info bg-white px-8 py-12 flex flex-col items-center">
  //   <Swiper
  //   effect={'cards'}
  //   grabCursor={true}
  //   modules={[EffectCards]}
  //   className="mySwiper"
  // >
  //   {winners.map(winner => (
  //     <SwiperSlide key={winner._id}>
  // <div className="flex flex-col items-center border-2 p-6 rounded-xl shadow-xl">
  //   <img
  //     src={winner.participantPhoto}
  //     alt=""
  //     className="w-32 h-32 rounded-full mb-4 shadow-md"
  //   />
  //   <h3 className="text-xl font-bold text-center mb-2">{winner.participantName}</h3>
  //   <p className="text-gray-600 text-center">Contest Winner</p>
  //   <div className="winning-entry mt-4">
  //     {/* Display the winner's creation here (image, video, text, etc.) */}
  //   </div>
  //   <div className="winner-quote mt-4 text-center">
  //     <p className="text-gray-700">Winning this contest was an amazing experience!</p>
  //   </div>
  //   <button className="btn hover:bg-transparent hover:text-[#0677A1] border-0 font-bold bg-[#0677A1] text-white items-center gap-2">
  //     See Portfolio
  //   </button>
  // </div>
  //     </SwiperSlide>
  //   ))}
  // </Swiper>
  // </div>

  return (
    <div className="hero min-h-screen my-28" style={{ backgroundImage: 'url(https://i.ibb.co/QCtXf2n/advertise-poster.jpg)' }}>
      <div className="contest-winner-section max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg overflow-hidden shadow-md">
        <div className="contest-ad bg-gradient-to-r from-[#0677A1] to-[#1E90FF] relative flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Challenge!</h2>
          <p className="text-lg text-white text-center max-w-md">
            Showcase your talent and compete with others to win amazing prizes. Be
            inspired by our winners and participate in the next exciting contest.
          </p>
          <button className="btn bg-white text-[#0677A1] font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#0677A1] hover:text-white transition-all duration-200">
            Learn More
          </button>
          <div className="contest-stats flex items-center mt-8">
            <FaUsers className="text-xl text-white mr-2" />
            <span className="text-lg text-white">{totalEntries.length}+ Entries</span>
          </div>
          <div className="contest-stats flex items-center mt-2">
            <GiLaurelsTrophy className="text-xl text-white mr-2" />
            <span className="text-lg text-white">{winners.length} Winners</span>
          </div>
        </div>
        <div>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                className: 'small-device',
              },
              640: {
                slidesPerView: 1,
                className: 'medium-device',
              },
              1024: {
                slidesPerView: 1,
                className: 'large-device',
              },
            }}
          >
            {winners.map(winner => (
              <SwiperSlide key={winner._id}>
                <div className="flex flex-col items-center bg-white border-2 p-6 rounded-xl shadow-xl">
                  <img
                    src={winner.participantPhoto}
                    alt=""
                    className="w-32 h-32 rounded-full mb-4 shadow-md"
                  />
                  <h3 className="text-xl font-bold text-center mb-2">{winner.participantName}</h3>
                  <p className="text-gray-600 text-center">{winner.contestName} Winner</p>
                  <div className="winning-entry mt-4">
                    {/* Display the winner's creation here (image, video, text, etc.) */}
                  </div>
                  <div className="winner-quote mt-4 text-center">
                    <p className="text-gray-700">Winning this contest was an amazing experience!</p>
                  </div>
                  <button className="btn hover:bg-transparent hover:text-[#0677A1] border-0 font-bold bg-[#0677A1] text-white items-center gap-2">
                    See Portfolio
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Advertise;
