import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { redefine } from "../../services/api";
import "../ChangePass/styleChangePass.css";
import { Input } from "../Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

export const passSchema = yup.object({
  newPass: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Deve ter no mínimo 6 caracteres")
    .max(20, "Deve ter no mínimo 20 caracteres"),
  newPassConfirm: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Deve ter no mínimo 6 caracteres")
    .max(20, "Deve ter no mínimo 20 caracteres"),
});

interface RedefinePassForm {
  newPass: string;
  newPassConfirm: string;
}

const RedefinePass = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<RedefinePassForm>({
    newPass: "",
    newPassConfirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toggle, setToggle] = useState<"text" | "password">("password");
  const navigate = useNavigate();

  const validateSchema = () => {
    try {
      const { newPass, newPassConfirm } = formValue;
      passSchema.validateSync(
        {
          newPass,
          newPassConfirm,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateSchema()) return;
    const { newPass, newPassConfirm } = formValue;
    if (newPass !== newPassConfirm) {
      setErrors({ newPassConfirm: "As senhas estão diferente" });
      return;
    }
    try {
      setLoading(true);
      await redefine({ senha: newPassConfirm }, params);
      navigate(`/`, { state: "active" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <section className="change-pass conteiner">
      <div className="change-pass-box">
        <div className="change-pass-content">
          <div className="change-pass-texto">
            <h2>Redefinir senha</h2>
            <p>Preencha os dados abaixo com atenção</p>
          </div>
          <form className="change-pass-form" onSubmit={handleSubmit}>
            <div className="change-pass-first-form">
              {["newPass", "newPassConfirm"].map((item, i) => {
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
                    type={toggle}
                    name={item}
                    className={`${
                      errors[item] ? "border-red-500" : "border-zinc-400"
                    } mb-12 w-full`}
                  >
                    <Input.Label htmlFor={item}>
                      {(function teste() {
                        if (item == "newPass") return "Nova senha";
                        if (item == "newPassConfirm")
                          return "Confirmar nova senha";
                      })()}
                    </Input.Label>
                    <Input.Error
                      stantard="Atenção ao digitar"
                      state={{
                        value: formValue[item],
                        error: errors[item],
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
                );
              })}
            </div>
            <div
              style={{
                alignContent: "center",
                margin: "0 auto",
                width: "400px",
              }}
            >
              <button className="edit-profile-btn" type="submit">
                {loading ? "Carregando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RedefinePass;
