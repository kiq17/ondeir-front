import { useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { checkTemp } from "../../services/api";

interface PrivateProps {
    redirect: string
}

const VerificationRoute = async ({ redirect }: PrivateProps) => {
    const { temp } = useParams();
    const [state, setState] = useState<boolean>(false);
    // const navigate = useNavigate();

    const t = async () => {
        try {
            await checkTemp(temp);
            setState(true)
        } catch (error) {
            console.log(error)
            setState(false)
        }
    }

    t()
    return (
        state ? <Outlet /> : <Navigate to={redirect} />
    );
}

export default VerificationRoute;