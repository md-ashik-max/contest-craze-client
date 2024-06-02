
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner/Banner";
import PopularContest from "./PopularContest/PopularContest";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContest></PopularContest>
            <Advertise></Advertise>
            
        </div>
    );
};

export default Home;