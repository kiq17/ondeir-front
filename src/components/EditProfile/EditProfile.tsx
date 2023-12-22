import { AxiosError } from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { editUser, getUser } from "../../services/api";
import "./styleEditProfile.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { Input } from "../Input";

export const profileSchema = yup.object({
  nome: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 20 caracteres"),
  descricao: yup
    .string()
    .required("Campo obrigatório")
    .min(20, "Deve ter no mínimo 20 caracteres")
    .max(200, "Deve ter no máximo 200 caracteres"),
});

interface ProfileForm {
  nome: string;
  descricao: string;
}

const EditProfile = ({ params }) => {
  const { user } = useContext(AuthContext);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<ProfileForm>({
    descricao: "",
    nome: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateSchema = () => {
    try {
      const { nome, descricao } = formValue;
      profileSchema.validateSync(
        {
          nome,
          descricao,
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

  const fetchUser = async () => {
    try {
      const { data } = await getUser(user?.id);
      setFormValue(data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (fetching) {
    return (
      <section className="profile conteiner" key={crypto.randomUUID()}>
        <h3 style={{ margin: "0 auto", padding: "200px" }}>Carregando...</h3>
      </section>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateSchema()) return;
    try {
      setLoading(true);
      const { nome, descricao } = formValue;
      await editUser({ nome, description: descricao });
      setLoading(false);
      navigate(`/perfil/${params}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        const t = error.response!.data;
        const e = t.error.body;
        setErrors(e);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <section className="edit-profile conteiner">
        <div className="edit-profile-box">
          <div className="edit-profile-content">
            <div className="edit-profile-texto">
              <h2>Edite seu perfil</h2>
              <p>Preencha os dados abaixo com atenção</p>
            </div>
            <form className="ed-profile-form-post" onSubmit={handleSubmit}>
              <Input.Root
                handleOnChange={(value) => {
                  setFormValue((prev) => ({ ...prev, nome: value }));
                }}
                onBlur={() => {
                  if (validateSchema()) return;

                  setErrors({});
                }}
                value={formValue.nome}
                type={"text"}
                name={"nome"}
                className={`${
                  errors["nome"] ? "border-red-500" : "border-zinc-400"
                } mb-12 w-full`}
              >
                <Input.Label htmlFor={"nome"}>Nome</Input.Label>
                <Input.Error
                  stantard="Atenção ao digitar"
                  state={{
                    value: formValue.nome,
                    error: errors["nome"],
                  }}
                />
              </Input.Root>
              <textarea
                className="edit-textarea"
                value={formValue.descricao}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    descricao: e.target.value,
                  }))
                }
              ></textarea>
              {errors.descricao && (
                <p className="error-msg">{errors.descricao}</p>
              )}

              <div
                style={{
                  alignContent: "center",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                <button className="edit-profile-btn" type="submit">
                  {loading ? "Carregando..." : "Editar"}
                </button>
              </div>
            </form>
          </div>
          <div className="edit-profile-actions">
            <div>
              <h3>Outras opções</h3>
            </div>
            <div>
              <p style={{ marginBottom: "5px" }}>
                Deseja deletar sua conta?{" "}
                <span
                  style={{ color: "blue" }}
                  role="button"
                  onClick={() => setVisible(!visible)}
                >
                  Clique aqui.
                </span>
              </p>
              <p>
                Deseja mudar sua senha?{" "}
                <Link
                  to={`/perfil/senha/${user?.id}`}
                  style={{ color: "blue" }}
                >
                  Clique aqui.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal visible={visible} setVisible={setVisible} userId={params} />
    </>
  );
};

export default EditProfile;
