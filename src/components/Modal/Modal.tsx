import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { Input } from "../Input";

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
        className={visible ? "conteiner-modal" : "h-screen fixed top-0 left-0 hidden justify-center items-center w-full z-[1000] bg-black bg-opacity-50 animate-fundo"}
      >
        <div className="modal max-sm:w-80">
          <button className="absolute text-2xl cursor-pointer bg-transparent top-3 right-6 text-zinc-400 hover:bg-zinc-100 transition-colors duration-300 rounded-full" onClick={() => setVisible(false)}>
            <XMarkIcon className="w-8 h-8"/>
          </button>
          <h3 className="font-bold text-3xl mb-8">Login</h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
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
              } mb-8 max-sm:w-64`}
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
              } mb-8 max-sm:w-64`}
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
              <p className="text-sm">
                Sua conta ainda não foi verificada.{" "}
                <Link
                className="text-blue-500 transition-all hover:underline text-sm ml-1"
                  to={`/verificacao/${check.message}`}
                >
                  Clique aqui
                </Link>
              </p>
            )}
            <button type="submit" className="btn w-full">
              {loading ? "Carregando..." : "Entrar"}
            </button>
            <p className="flex gap-3">
              Não tem uma conta?<Link className="link-base" to={"/cadastro"}>Inscreva-se</Link>
            </p>
            <Link className="link-base" to={"/enviar"}>Esqueceu sua senha?</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
