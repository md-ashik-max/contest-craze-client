

import { Helmet } from "react-helmet-async";
import Advertise from "./Advertise/Advertise";
import Banner from "./Banner/Banner";
import SearchBox from "./Banner/SearchBox";
import BestCreator from "./BestCreator/BestCreator";
import PopularContest from "./PopularContest/PopularContest";


const Home = () => {
    return (
        <div>
             <Helmet>
                <title>Contest Craze / Home</title>
            </Helmet>
            <Banner></Banner>
            <SearchBox></SearchBox>
            <PopularContest></PopularContest>
            <Advertise></Advertise>
            <BestCreator></BestCreator>
            
        </div>
    );
};

export default Home;