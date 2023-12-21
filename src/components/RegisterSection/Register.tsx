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
      <div className="center">
        {isMed && (
          <div className={loadingImg ? "img-compress" : "img-compress load"}>
            <img
              src={bannerCadastro}
              onLoad={() => {
                setLoadingImg(false);
              }}
              alt="Grupo de pessoas com mochilas sorrindo em uma paisagem desértica"
              loading="lazy"
              ref={imgRef}
            />
          </div>
        )}
        <div className="form-cadastro">
          <div className="texto-cadastro">
            <h3>Explore o mundo</h3>
            <p>Preencha os dados abaixo</p>
          </div>
          <form onSubmit={handleSubmit} className="form-box">
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
                errorMsg || errors.estado || errorReq?.estadoError
                  ? "input-box error-input"
                  : "input-box"
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
                className="form-input"
                placeholder=" "
                onClick={(e) => e.stopPropagation()}
                value={estado}
                onChange={handleInputChange}
              />
              <label htmlFor="estado" className="form-label">
                Estado
              </label>
              {estadosMatch.length ? (
                <ul className="estados">
                  {estadosMatch.map((value, index) => (
                    <li key={index} onClick={newValue}>
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
            <div className="box-button">
              <button type="submit" className="btn-submit">
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
