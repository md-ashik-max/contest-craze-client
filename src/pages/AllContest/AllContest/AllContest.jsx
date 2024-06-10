import { Helmet } from "react-helmet-async";
import ContestBanner from "../ContestBanner/ContestBanner";
import ContestContainer from "../ContestContainer/ContestContainer";


const AllContest = () => {
    return (
        <div>
             <Helmet>
                <title>Contest Craze / All Contest</title>
            </Helmet>
            <ContestBanner></ContestBanner>
            <ContestContainer></ContestContainer>
            
        </div>
    );
};

export default AllContest;