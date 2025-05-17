import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VerificationField from "../../components/VerificationField/VerificationField";
import { checkCode, checkTemp, resendEmail } from "../../services/api";
import { safeEmail } from "../../services/safeEmail";

const VerficationPage = () => {
  const [otp, setOtp] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [seconds, setSeconds] = useState(300);
  const [cliques, setCliques] = useState(1);
  const [user, setUsers] = useState();
  const { temp } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const t = async () => {
    try {
      const { data } = await checkTemp(temp);
      setLoading(false);
      setUsers(data.id);
    } catch (error) {
      setLoading(false);
      // navigate("/")
    }
  };

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

    (async () => {
      await resendEmail(user);
    })();
  };

  useEffect(() => {
    t();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      if (seconds === 0) {
        clearInterval(interval);

        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cliques]);

  // const sendOtp = async () => {
  //   const otpString = otp.join("").replace(",", "");

  //   try {
  //     if (location.state.redefine) {
  //       const { data } = await checkCode({ otp: otpString });
  //       navigate(`/redefinir/${data.user}`);
  //       return;
  //     }
  //     await checkCode({ otp: otpString });
  //     navigate(`/`, { state: "active" });
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       setError(error.response?.data.message);
  //     }
  //   }
  // };

  if (loading) {
    return (
      <section className="profile conteiner">
        <h3 style={{ margin: "0 auto", padding: "200px" }}>Carregando...</h3>
      </section>
    );
  }

  document.title = "OndeIr | Verificação";

  return (
    <section className="varification flex items-center justify-center h-screen conteiner relative overflow-hidden">
      <div className="absolute top-0 left-40 w-[450px] h-[450px] bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-40 w-[450px] h-[450px] bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 right-96 w-[520px] h-[520px] bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <div className="w-[500px] h-[560px] bg-white z-50 rounded-lg flex flex-col gap-5 m-auto border-2 border-zinc-400 p-10">
        <h1 className="font-bold text-3xl text-gr text-center">OndeIr</h1>
        <h3 className="text-center font-normal text-lg">
          Digite o código que foi enviado para o email{" "}
          <span className="font-bold">{safeEmail(location.state.email)}</span>
        </h3>
        <VerificationField handleOtp={(value) => setOtp(value)} />
        {error && <p className="self-end m-auto text-red-500">{error}</p>}
        <p className="text-center text-zinc-400">
          Para proteger sua conta, não compartilhe esse código
        </p>
        <div className="bg-zinc-100 rounded-lg p-5">
          <div className="flex items-center gap-2">
            <MegaphoneIcon className="w-6 h-6" />
            <p className="font-bold text-lg">Link temporário</p>
          </div>
          <p className="text-zinc-600 ml-8">
            Caso você saia desta página por algum motivo realize novamente o seu
            login para que outro link possa ser gerado.
          </p>
        </div>
        <button
          disabled={seconds > 0}
          onClick={handleResend}
          className="code-resend"
          style={{ color: `${seconds == 0 ? "blue" : "gray"}` }}
        >
          {seconds > 0
            ? `Reenviar código. Espere ${new Date(seconds * 1000)
                .toISOString()
                .slice(14, 19)}`
            : "Reenviar código."}
        </button>
      </div>
    </section>
  );
};

export default VerficationPage;
