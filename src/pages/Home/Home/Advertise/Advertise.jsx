

const Advertise = ({ contestWinner, contestParticipationCount, totalContestWinners }) => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/QCtXf2n/advertise-poster.jpg)' }}>
           <div className="contest-winner-section grid grid-cols-1 md:grid-cols-2 gap-8 rounded-lg overflow-hidden shadow-md">
      <div className="contest-ad bg-gradient-to-r from-purple-500 to-indigo-500 relative flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Join the Challenge!</h2>
        <p className="text-lg text-white text-center max-w-md">
          Showcase your talent and compete with others to win amazing prizes. Be
          inspired by our winners and participate in the next exciting contest.
        </p>
        <a href="#" className="btn btn-primary mt-4">Learn More</a>
        <div className="contest-stats flex items-center mt-8">
          <img
            src="participation-icon.svg"
            alt="Contest Participation Icon"
            className="w-8 h-8 mr-2"
          />
          <span className="text-lg text-white">{contestParticipationCount}+ Entries</span>
        </div>
        <div className="contest-stats flex items-center mt-2">
          <img src="trophy-icon.svg" alt="Total Contest Winners Icon" className="w-8 h-8 mr-2" />
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
        <p className="text-gray-600 text-center">{contestWinner}</p>
        <div className="winning-entry mt-4">
          {/* Display the winner's creation here (image, video, text, etc.) */}
        </div>
        <div className="winner-quote mt-4 text-center">
          <p className="text-gray-700">{contestWinner}</p>
        </div>
        <a href={contestWinner} className="btn btn-primary mt-4">See {contestWinner} Portfolio</a>
      </div>
    </div>
        </div>
    );
};

export default Advertise;