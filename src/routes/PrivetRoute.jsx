import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivetRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    if(loading){
        return <span className="loading loading-spinner text-info"></span>
    }
    if(user){
        return children;
    }

    return <Navigate to={'/signIn'} state={{from:location}} replace></Navigate>;
};

export default PrivetRoute;