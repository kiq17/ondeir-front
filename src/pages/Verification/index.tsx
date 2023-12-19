import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VerificationField from "../../components/VerificationField/VerificationField";
import { checkCode, checkTemp, resendEmail } from "../../services/api";

const VerficationPage = () => {
    const [otp, setOtp] = useState<string[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [seconds, setSeconds] = useState(300);
    const [cliques, setCliques] = useState(1);
    const [user, setUsers] = useState();
    const { temp } = useParams();
    const navigate = useNavigate();
    const location = useLocation()

    const t = async () => {
        try {
            const { data } = await checkTemp(temp);
            setLoading(false)
            setUsers(data.id)
        } catch (error) {
            setLoading(false)
            navigate("/")
        }
    }

    const handleResend = () => {
        if (seconds > 0) return;

        setSeconds(0);

        setCliques(cliques + 1);

        switch (cliques) {
            case 1:
                setSeconds(10 * 60);
                break;
            case 2:
                setSeconds(30 * 60);
                break;
            default:
                setSeconds(2 * 60 * 60);
                break;
        }

        (async ()=>{
            await resendEmail(user)
        })()
    }

    useEffect(() => {
        t();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
            if (seconds === 0) {
                clearInterval(interval);

                setSeconds(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [cliques])



    const sendOtp = async () => {
        const otpString = otp.join("").replace(",", "")

        /* if (otpString.length < 6) {
            setError("Código incompleto")
            return
        } */

        try {
            if (location.state === "redefine") {
                const { data } = await checkCode({ otp: otpString });
                navigate(`/redefinir/${data.user}`)
                return
            }
            await checkCode({ otp: otpString });
            navigate(`/`, { state: "active" })
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
            }
        }
    }


    if (loading) {
        return (
            <section className="profile conteiner" key={crypto.randomUUID()}>
                <h3 style={{ margin: "0 auto", padding: "200px" }}>Carregando...</h3>
            </section>
        )
    }

    setInterval(() => {

    }, 1000)
    document.title = "OndeIr | Verificação"

    return (
        <section className="varification conteiner">
            <div style={{ display: "flex", width: "100%", border: "2px solid red", padding: "15px", borderRadius: "8px", marginTop: "60px" }}>
                <FontAwesomeIcon icon={faExclamation} color="red" size="xl" />
                <p style={{ marginLeft: "10px", alignSelf: "flex-start" }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "red", marginRight: "10px" }}>
                        Atenção
                    </span>Verifique seu E-mail.Esta página é temporária caso você saia dela por algum motivo realize novamente o seu login que outra página será gerada.</p>
            </div>
            <VerificationField handleOtp={value => setOtp(value)} />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", width: "100%" }}>
                {error && (
                    <p className="error-msg" style={{ alignSelf: "flex-end", margin: "0 auto" }}>{error}</p>
                )}
                <button className="otp-btn" onClick={sendOtp} style={{ margin: "0 auto" }}>Checar código</button>
                <button disabled={seconds > 0} onClick={handleResend} className="code-resend" style={{ alignSelf: "flex-end", margin: "0 auto", color: `${seconds == 0 ? "blue" : "gray"}` }}>{seconds > 0 ? `Reenviar código. Espere ${new Date(seconds * 1000).toISOString().slice(14, 19)}` : "Reenviar código."}</button>
            </div>
        </section>
    )
}

export default VerficationPage;