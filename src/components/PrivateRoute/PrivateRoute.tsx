import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/auth";

interface PrivateProps {
    redirect: string
}

const PrivateRoute = ({ redirect }: PrivateProps) => {
    const { authenticated } = useContext(AuthContext);

    return (
        authenticated ? <Outlet /> : <Navigate to={redirect} />
    );
}

export default PrivateRoute;