
// import Countdown from "../../../components/Countdown";
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner/Banner";
import BestCreator from "./BestCreator/BestCreator";
import PopularContest from "./PopularContest/PopularContest";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContest></PopularContest>
            <Advertise></Advertise>
            <BestCreator></BestCreator>
            {/* <Countdown></Countdown> */}
            
        </div>
    );
};

export default Home;