/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../interfaces/loginuser";
import { Api, loginReq } from "../services/api";

interface LocalUser {
    id: string
    nome: string;
    email: string;
}

interface ContextProps {
    authenticated: boolean
    user: null | LocalUser
    login: (value: LoginUser) => void
    logout: () => void
    errorLogin: Record<string, string>
    loading: boolean
}

export const AuthContext = createContext({} as ContextProps);

interface AuthProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErroLogin] = useState<Record<string,string>>({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user && token) {
            setUser(JSON.parse(user));
            Api.defaults.headers.authorization = `Bearer ${JSON.parse(token)}`;
        }
    }, [])

    const login = async (formValue) => {
        try {
            setLoading(true);
            const response = await loginReq(formValue);

            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            const localUser = JSON.parse(localStorage.user)
            setUser(response.data.user);
            Api.defaults.headers.authorization = `Bearer ${response.data.token}`

            setLoading(false);
            navigate(`/perfil/${localUser.id}`, { state: "Login efetuado com sucesso" });
        } catch (error) {
            if (error instanceof AxiosError) {
                if(error.response?.status === 401){
                    setErroLogin({status: "unauthorized", message: error?.response?.data.tempLink});
                } else{
                    setErroLogin({status: "email", message: error?.response?.data.message});
                }
            }
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Api.defaults.headers.authorization = null;

        setUser(null);
    }

    return (
        <AuthContext.Provider value={
            {
                authenticated: user ? true : false,
                user,
                login,
                logout,
                errorLogin,
                loading
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}