import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAllContest = () => {
    const axiosPublic= useAxiosPublic();

    const {data:allContest=[],isPending:loading,refetch}=useQuery({
        queryKey:['allContest'],
        queryFn:async()=>{
            const res=await axiosPublic.get('/contests')
            return res.data

        }
    })

    return [allContest, loading,refetch]
};

export default useAllContest;