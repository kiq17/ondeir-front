import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { AxiosError } from "axios";
import {
    FormEvent,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { createPalce } from "../../services/api";
import { postSchema } from "../EditPost/EditPost";
import { Input } from "../Input";
import "../NewPost/stylePost.css";
import { Tags } from "../Shared/Tags/Tags";

interface CreatePlace {
  titulo: string;
  descricao: string;
  tags: string[];
  imageFile: string[];
}

const Post = () => {
  const [formValue, setFormValue] = useState<CreatePlace>({
    descricao: "",
    imageFile: [],
    tags: [],
    titulo: "",
  });
  const { titulo, descricao, imageFile, tags } = formValue;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageState, setImageState] = useState([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const inputRef = useRef<HTMLLabelElement>(null);

  const validateSchema = () => {
    try {
      console.log(formValue);
      postSchema.validateSync(
        {
          titulo,
          descricao,
          tags,
          imageFile,
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

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current.childNodes[0] as HTMLLabelElement).id = "inputFile";
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (validateSchema()) {
      setLoading(false);
      return;
    }
    try {
      if (user?.id !== undefined) {
        await createPalce(user?.id, formValue);
      }

      setLoading(false);
      navigate(`/perfil/${user?.id}`, {
        state: "Postagem cridada com sucesso",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const t = error.response!.data;
        const e = t.error.body;
        setErrors(e);
      }
      setLoading(false);
    }
  };

  const handleFiles = (files) => {
    const resultBase = files.map((item) => item.base64);
    if (resultBase.length > 3) {
      setErrors((prev) => ({
        ...prev,
        imageError: "Somente quatro imagens são permitidas",
      }));
      return;
    }
    setImageState(resultBase);
    setFormValue({ ...formValue, imageFile: [...resultBase] });
  };

  const filterPreviewImages = (id) => {
    setImageState((prev) => [
      ...prev.filter((image) => image != imageFile[id]),
    ]);
  };

  return (
    <section className="post conteiner">
      <div className="post-box">
        <div className="post-texto">
          <h2>Crie seu post</h2>
          <p>Compartilhe sua experiência conosco</p>
        </div>
        <form
          className="form-post"
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
            }
          }}
        >
          <div className="first-form-post">
            <Input.Root
              handleOnChange={(value) => {
                setFormValue((prev) => ({ ...prev, titulo: value }));
              }}
              onBlur={() => {
                if (validateSchema()) return;

                setErrors({});
              }}
              value={formValue.titulo}
              type={"text"}
              name={"titulo"}
              className={`${
                errors["titulo"] ? "border-red-500" : "border-zinc-400"
              } mb-9 w-[470px]`}
            >
              <Input.Label htmlFor={"titulo"}>Título</Input.Label>
              <Input.Error
                stantard="Atenção ao digitar"
                state={{
                  value: formValue.titulo,
                  error: errors["titulo"],
                }}
              />
            </Input.Root>
            <Tags
              onChange={(tags) => {
                setFormValue({ ...formValue, tags: tags });
              }}
              value={formValue.tags}
            />
            {errors.tags && (
              <p
                className={
                  "text-red-500 text-sm animate-errorAni ml-3 flex gap-2"
                }
              >
                <ExclamationCircleIcon className="h-5 w-5" />
                {errors.tags}
              </p>
            )}
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <label
                ref={inputRef}
                className="box-fileInput"
                htmlFor="inputFile"
              >
                <FileBase
                  type="file"
                  multiple={true}
                  onDone={(files) => handleFiles(files)}
                />
              </label>
              {errors.imageFile && (
                <p
                  className="error-msg"
                  style={{ alignSelf: "flex-end", marginBottom: "0px" }}
                >
                  {errors.imageFile}
                </p>
              )}
              {imageState.length
                ? imageState.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        width: "120px",
                        height: "120px",
                        position: "relative",
                      }}
                    >
                      <button
                        type="button"
                        id={index.toString()}
                        onClick={(e) =>
                          filterPreviewImages(
                            (e.target as HTMLButtonElement).id
                          )
                        }
                        style={{
                          width: "20px",
                          padding: "5px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          margin: "0px",
                          backgroundColor: "red",
                          borderRadius: "100%",
                          fontSize: "15px",
                          position: "absolute",
                          right: "5px",
                          bottom: "90px",
                        }}
                      >
                        X
                      </button>
                      <img
                        style={{ borderRadius: "7px" }}
                        src={image}
                        alt="Imagem selecionada"
                      />
                    </div>
                  ))
                : ""}
              {errors?.imageError && (
                <p
                  className="error-msg"
                  style={{ marginTop: "-15px", marginBottom: "15px" }}
                >
                  {errors.imageError}
                </p>
              )}
            </div>
          </div>
          <div className="second-form-post">
            <div className="textArea-box" style={{ marginBottom: "20px" }}>
              <textarea
                name="descricao"
                placeholder="Descrição"
                value={formValue.descricao}
                onBlur={() => {
                  if (validateSchema()) return;

                  setErrors({});
                }}
                onChange={(e) =>
                  setFormValue((prev) => ({
                    ...prev,
                    descricao: e.target.value,
                  }))
                }
              ></textarea>
              {errors.descricao && (
                <p
                  className={
                    "text-red-500 text-sm animate-errorAni ml-3 flex gap-2"
                  }
                >
                  <ExclamationCircleIcon className="h-5 w-5" />
                  {errors.descricao}
                </p>
              )}
            </div>
          </div>
          <div style={{ alignContent: "center", margin: "0 auto" }}>
            <button type="submit">{loading ? "Carregando..." : "Criar"}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Post;
