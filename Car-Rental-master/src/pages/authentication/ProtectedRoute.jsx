import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function ProtectedRoute({children}){
    let {user} = useUserAuth();
    if(!user){
        return <Navigate to="/login"/>
    }else{
        return children;
    }
}