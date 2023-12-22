import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { Input } from "../Input";
import "../Modal/styleModal.css";

interface IFormLogin {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().required("Campo obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Deve ter no mínimo 6 caracteres"),
});

const Modal = ({ visible, setVisible }) => {
  const { login, loading } = useContext(AuthContext);
  const [formValue, setFormValue] = useState<IFormLogin>({
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [check, setCheck] = useState<Record<string, string>>({});
  const [toggle, setToggle] = useState<"text" | "password">("password");

  const validateSchema = () => {
    try {
      const { email, password } = formValue;
      loginSchema.validateSync(
        {
          email,
          password,
        },
        { abortEarly: false }
      );
    } catch (error) {
      const yupError = error as ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      setErrors(objectErros);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSchema()) {
      const response = await login(formValue);

      if (response === undefined) return;

      const { message, status } = response;

      if (status == "email") {
        setErrors({
          email: message,
          password: message,
        });

        return;
      }
      setCheck({ type: status, message });
    }
  };

  return (
    <>
      <div
        id="cover"
        onClick={(e) => {
          if ((e.target as HTMLDivElement).getAttribute("id")) {
            setVisible(false);
          }
        }}
        className={visible ? "conteiner-modal mostrar" : "conteiner-modal"}
      >
        <div className="modal">
          <button id="fechar" onClick={() => setVisible(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h3>Login</h3>
          <form onSubmit={handleSubmit} className="form-box">
            <Input.Root
              handleOnChange={(value) => {
                setFormValue((prev) => ({ ...prev, email: value }));
              }}
              onBlur={() => {
                if (validateSchema()) return;

                setErrors({});
              }}
              value={formValue.email}
              type={"text"}
              name={"email"}
              className={`${
                errors["email"] ? "border-red-500" : "border-zinc-400"
              } mb-8`}
            >
              <Input.Label htmlFor={"email"}>Email</Input.Label>
              <Input.Error
                stantard="Atenção ao digitar"
                state={{
                  value: formValue.email,
                  error: errors["email"],
                }}
              />
            </Input.Root>

            <Input.Root
              handleOnChange={(value) => {
                setFormValue((prev) => ({ ...prev, password: value }));
              }}
              onBlur={() => {
                if (validateSchema()) return;

                setErrors({});
              }}
              value={formValue.password}
              type={toggle}
              name={"senha"}
              className={`${
                errors["password"] ? "border-red-500" : "border-zinc-400"
              } mb-8`}
            >
              <Input.Label htmlFor={"senha"}>Senha</Input.Label>
              <Input.Error
                stantard="Atenção ao digitar"
                state={{
                  value: formValue.password,
                  error: errors["password"],
                }}
              />
              <Input.Icon>
                {toggle == "text" && (
                  <EyeIcon
                    className="h-6 w-6 text-zinc-400 absolute top-4 right-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggle("password");
                    }}
                  />
                )}
                {toggle == "password" && (
                  <EyeSlashIcon
                    className="h-6 w-6 text-zinc-400 absolute top-4 right-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setToggle("text");
                    }}
                  />
                )}
              </Input.Icon>
            </Input.Root>
            {check.type === "unauthorized" && (
              <p style={{ fontSize: "13px" }}>
                Sua conta ainda não foi verificada.{" "}
                <Link
                  style={{ color: "blue", marginLeft: "5px", fontSize: "13px" }}
                  to={`/verificacao/${check.message}`}
                >
                  Clique aqui
                </Link>
              </p>
            )}
            <button type="submit" className="btn-submit">
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <p className="reg">
              Não tem uma conta?<a href="/cadastro">Inscreva-se</a>
            </p>
            <Link to={"/enviar"}>Esqueceu sua senha?</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
