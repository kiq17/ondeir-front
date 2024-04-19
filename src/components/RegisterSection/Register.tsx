import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import bannerCadastro from "../../assets/bannerCadastro.jpg";
import { ErrorRegister, Register } from "../../interfaces/register";
import { registerReq } from "../../services/api";
import estados from "../../services/states";
import "../RegisterSection/styleRegister.css";
import useMediaQuery from "../Shared/Hooks/useMediaQuery";
import { Input } from "../Input";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";

const userSchema = yup.object({
  nome: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no mínimo 20 caracteres"),
  senha: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Deve ter no mínimo 6 caracteres")
    .max(20, "Deve ter no mínimo 20 caracteres"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  estado: yup.string().required("Campo obrigatório"),
});

const Register = () => {
  const [formValue, setFormValue] = useState<Register>({
    nome: "",
    senha: "",
    email: "",
    estado: "",
  });
  let { nome, senha, email, estado } = formValue;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorReq, setErrorReq] = useState<ErrorRegister>();
  const [loading, setLoading] = useState(false);
  const [estadosMatch, setEstadosMatch] = useState<string[]>([]);
  const [loadingImg, setLoadingImg] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const isMed = useMediaQuery("(min-width: 1250px)");
  const [toggle, setToggle] = useState<"text" | "password">("password");

  const validateSchema = () => {
    try {
      userSchema.validateSync(
        { nome, senha, email, estado },
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

  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setLoadingImg(false);
      } else {
        imgRef.current.addEventListener("load", () => setLoading(false));
      }
    }
  }, [imgRef]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateSchema()) return;
    try {
      setLoading(true);
      const { data } = await registerReq(formValue);
      setLoading(false);
      navigate(`/verificacao/${data.tempLink}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error!.response!.data;
        setErrors({email: message["emailExist"]})
      }
      setLoading(false);
    }
  };

  const newValue = (e) => {
    estado = e.target.textContent;
    setFormValue({ ...formValue, estado });
    setEstadosMatch([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "estado") {
      if (value) {
        const arrayFilter = estados.filter((estado) => {
          const regEx = new RegExp(`${value}`, "gi");
          return estado.match(regEx);
        });
        setEstadosMatch(arrayFilter);
      } else {
        setEstadosMatch([]);
      }
    }
    setErrorMsg(false);
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <section className="cadastro-box conteiner">
      <div className="flex rounded-lg shadow-2xl">
        {isMed && (
          <div className={loadingImg ? "bg-[url('src/assets/compressed/cadastroCompressesd.jpg')] w-[700px] h-[400px] bg-cover bg-center group transition-all duration-400 load" : "bg-[url('src/assets/compressed/cadastroCompressesd.jpg')] w-[700px] h-[400px] bg-cover bg-center group transition-all duration-400"}>
            <img
              src={bannerCadastro}
              className="w-full h-full object-center object-cover group-[.load]:invisible"
              onLoad={() => {
                setLoadingImg(false);
              }}
              alt="Grupo de pessoas com mochilas sorrindo em uma paisagem desértica"
              loading="lazy"
              ref={imgRef}
            />
          </div>
        )}
        <div className="bg-white flex flex-col items-center gap-5 py-1 px-6">
          <div className="text-center mb-3">
            <h3 className="font-bold text-3xl mt-3">Explore o mundo</h3>
            <p className="text-zinc-500">Preencha os dados abaixo</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-5 w-[450px]">
            {["nome", "email"].map((item, i) => {
              return (
                <Input.Root
                  key={i}
                  handleOnChange={(value) => {
                    setFormValue((prev) => ({ ...prev, [item]: value }));
                  }}
                  onBlur={() => {
                    if (validateSchema()) return;

                    setErrors({});
                  }}
                  value={formValue[item]}
                  type={"text"}
                  name={item}
                  className={`${
                    errors[item] ? "border-red-500" : "border-zinc-400"
                  } mb-9 w-52`}
                >
                  <Input.Label htmlFor={item}>
                    {item[0].toUpperCase() + item.slice(1)}
                  </Input.Label>
                  <Input.Error
                    stantard="Atenção ao digitar"
                    state={{
                      value: formValue[item],
                      error: errors[item],
                    }}
                  />
                </Input.Root>
              );
            })}

            <div
              className={
                errorMsg || errors.estado
                  ? "box-input relative w-52 transition-all h-14 rounded-md cursor-text border-2 border-red-500 mb-9"
                  : "box-input relative w-52 transition-all h-14 rounded-md cursor-text border-2 border-zinc-500 mb-9"
              }
              onClick={(e) => {
                e.stopPropagation();
                const inp = (e.target as HTMLDivElement)
                  .childNodes[0] as HTMLInputElement;
                inp.focus();
              }}
            >
              <input
                type="text"
                name="estado"
                autoComplete="off"
                className="w-full relative top-5 peer outline-none border-none p-2 h-7 placeholder-transparent text-zinc-700 bg-transparent"
                placeholder=" "
                onClick={(e) => e.stopPropagation()}
                value={estado}
                onChange={handleInputChange}
              />
              <label htmlFor="estado" className="transition-all relative bottom-7 left-2 peer-focus:text-emerald-600 text-sm text-zinc-500 pointer-events-none peer-focus:bottom-7 peer-focus:text-sm peer-placeholder-shown:bottom-3 peer-placeholder-shown:text-base">
                Estado
              </label>
              {estadosMatch.length ? (
                <ul className="bg-white h-48 w-52 overflow-scroll overflow-x-hidden absolute z-[1000] top-14">
                  {estadosMatch.map((value, index) => (
                    <li key={index} className="cursor-pointer p-2 color text-zinc-700 hover:bg-zinc-200 transition-all duration-300" onClick={newValue}>
                      {value}
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
              {errors.estado && (
                <p
                  className={
                    "text-red-500 text-sm absolute animate-errorAni left-2 flex gap-2"
                  }
                >
                  <ExclamationCircleIcon className="h-5 w-5" />
                  {errors.estado}
                </p>
              )}
            </div>
            <Input.Root
              handleOnChange={(value) => {
                setFormValue((prev) => ({ ...prev, senha: value }));
              }}
              onBlur={() => {
                if (validateSchema()) return;

                setErrors({});
              }}
              value={formValue.senha}
              type={toggle}
              name={"senha"}
              className={`${
                errors["senha"] ? "border-red-500" : "border-zinc-400"
              } mb-9 w-52`}
            >
              <Input.Label htmlFor={"senha"}>Senha</Input.Label>
              <Input.Error
                stantard="Atenção ao digitar"
                state={{
                  value: formValue.senha,
                  error: errors["senha"],
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
            <div className="flex flex-col items-center w-full m-auto">
              <button type="submit" className="btn w-1/2">
                {loading ? "Carregando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
