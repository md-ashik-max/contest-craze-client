import { GiLaurelsTrophy } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Advertise = ({ contestWinner, totalContestWinners }) => {
  const axiosPublic = useAxiosPublic()
  // const [entries, setEntries] = useState([])

  const { data: totalEntries = [], } = useQuery({
    queryKey: ['totalEntries'],
    queryFn: async () => {
      const res = await axiosPublic.get('/payments')
      return res.data

    }
  })
  return (
    <div className="hero min-h-screen my-28" style={{ backgroundImage: 'url(https://i.ibb.co/QCtXf2n/advertise-poster.jpg)' }}>
      <div className="contest-winner-section grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg overflow-hidden shadow-md">
        <div className="contest-ad bg-gradient-to-r from-[#0677A1] to-[#1E90FF] relative flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Challenge!</h2>
          <p className="text-lg text-white text-center max-w-md">
            Showcase your talent and compete with others to win amazing prizes. Be
            inspired by our winners and participate in the next exciting contest.
          </p>
          <button className="btn bg-white text-[#0677A1] font-bold py-3 px-6 rounded-full shadow-md hover:bg-[#0677A1] hover:text-white transition-all duration-200">Learn More</button>
          <div className="contest-stats flex items-center mt-8">
          <FaUsers className="text-xl text-white mr-2"></FaUsers>
            <span className="text-lg text-white">{totalEntries.length}+ Entries</span>
          </div>
          <div className="contest-stats flex items-center mt-2">
          <GiLaurelsTrophy className="text-xl text-white mr-2"></GiLaurelsTrophy>
            <span className="text-lg text-white">{totalContestWinners} Winners</span>
          </div>
        </div>
        <div className="winner-info bg-white px-8 py-12 flex flex-col items-center">
          <img
            src="winner-avatar.jpg"
            alt="Contest Winner Avatar"
            className="w-32 h-32 rounded-full mb-4 shadow-md"
          />
          <h3 className="text-xl font-bold text-center mb-2">{contestWinner}</h3>
          <p className="text-gray-600 text-center">Contest Winner</p>
          <div className="winning-entry mt-4">
            {/* Display the winner's creation here (image, video, text, etc.) */}
          </div>
          <div className="winner-quote mt-4 text-center">
            <p className="text-gray-700">Winning this contest was an amazing experience!</p>
          </div>
          <button className=" btn hover:bg-transparent hover:text-[#0677A1] border-0 font-bold bg-[#0677A1] text-white items-center gap-2 ">See {contestWinner}s Portfolio</button>
        </div>
      </div>
    </div>
  );
};

export default Advertise;