import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyParticipatedContest = () => {
    const{user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:myParticipatedContest=[]}=useQuery({
        queryKey:['myParticipatedContest'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments/${user?.email}`)
            return res.data

        }
    })
    console.log(myParticipatedContest)
    return (
        <div>
            <h1>My participated contest : {myParticipatedContest.length}</h1>
        </div>
    );
};

export default MyParticipatedContest;