import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { resend } from "../../services/api";
import "./styleSend.css";
import { Input } from "../Input";

const emailSchema = yup.object({
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
});

const Send = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateSchema = () => {
    try {
      emailSchema.validateSync({ email }, { abortEarly: false });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      setErrors(objectErros);
      return true;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateSchema()) return;

    try {
      setLoading(true);
      const { data } = await resend({ email });
      setLoading(false);
      navigate(`/verificacao/${data.tempLink}`, {
        state: { redefine: "redefine", email },
      });
    } catch (error) {
      setErrors({ email: "Esse email não existe" });
      setLoading(false);
    }
  };

  return (
    <section className="send conteiner">
      <form onSubmit={handleSubmit}>
        <div className="edit-profile-texto">
          <h2>Digite seu Email</h2>
          <p>Um código será enviado</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            width: "320px",
            margin: "0 auto",
          }}
        >
          <Input.Root
            handleOnChange={(value) => {
              setEmail(value);
            }}
            onBlur={() => {
              if (validateSchema()) return;

              setErrors({});
            }}
            value={email}
            type={"text"}
            name={"email"}
            className={`${
              errors["email"] ? "border-red-500" : "border-zinc-400"
            } mb-8 w-full`}
          >
            <Input.Label htmlFor={"email"}>Email</Input.Label>
            <Input.Error
              stantard="Atenção ao digitar"
              state={{
                value: email,
                error: errors["email"],
              }}
            />
          </Input.Root>
          <div style={{ width: "100%" }}>
            <button className="send-btn" type="submit">
              {loading ? "Carregando..." : "Enviar"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Send;
