import { XCircleIcon } from "@heroicons/react/20/solid";
import { AxiosError } from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { Place } from "../../interfaces/place";
import { editPlace, getPlace } from "../../services/api";
import { Input } from "../Input";
import { Tags } from "../Shared/Tags/Tags";



export const postSchema = yup.object({
  titulo: yup
    .string()
    .required("Campo obrigatório")
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 20 caracteres"),
  descricao: yup
    .string()
    .required("Campo obrigatório")
    .min(50, "Deve ter no mínimo 20 caracteres")
    .max(1000, "Deve ter no máximo 20 caracteres"),
  tags: yup
    .array()
    .required("Campo obrigatório")
    .length(3, "Deve ter no mínimo 3 tags")
    .max(5, "Deve ter no máximo 5 tags"),
  imageFile: yup
    .array()
    .required("Campo obrigatório")
    .min(1, "Deve ter no mínimo 1 imagem")
    .max(4, "Deve ter no máximo 4 imagens"),
});

const EditPost = ({ params }) => {
  const [formValue, setFormValue] = useState<Omit<Place, "_id" | "createdAt">>({
    titulo: "",
    descricao: "",
    tags: [],
    imageFile: [],
    criadoPor: { _id: "", nome: "" },
    estrelas: { media: 0 },
  });
  const { titulo, descricao, tags, imageFile } = formValue;
  const { user } = useContext(AuthContext);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageState, setImageState] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLLabelElement>(null);

  const validateSchema = () => {
    try {
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

    const fectchPlaceData = async () => {
      try {
        const response = await getPlace(params);
        setFormValue(response.data);
        setImageState(response.data.imageFile);
        setFetching(false);
      } catch (error) {
        setFetching(false);
      }
    };

    fectchPlaceData();
  }, [errors]);

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
      if (titulo && descricao) {
        setLoading(true);
        if (user?.id !== undefined) {
          await editPlace(params, { ...formValue, tags: newTags });
          navigate(`/perfil/${user.id}`, {
            state: "Postagem editada com sucesso",
          });
        }
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const t = error.response!.data;
        const e = t.error.body;
        setErrors(e);
      }
      setLoading(false);
    }
  };

  const inputChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleFiles = (files) => {
    const resultBase = [
      ...files.map((item) => item.base64),
      ...formValue.imageFile,
    ];
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
    <section className="py-16 conteiner">
      <div className="flex flex-col justify-center gap-5">
        <div className="text-center m-auto mb-8">
          <h2 className="text-3xl font-bold text-gr">Edite seu post</h2>
          <p className="text-zinc-400">Preencha os dados abaixo com atenção</p>
        </div>
        <form
          className="flex justify-between flex-wrap w-full gap-5"
          onSubmit={handleSubmit}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              event.preventDefault();
            }
          }}
        >
          <div className="w-full flex-1">
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
                setNewTags(tags);
              }}
              value={formValue.tags}
            />
            {errors.tags && <p className="error-msg">{errors.tags}</p>}
            <div className="flex gap-5 flex-wrap">
              <label
                ref={inputRef}
                className="bg-zinc-300 w-32 h-32 rounded-lg block bg-contain bg-no-repeat cursor-pointer bg-camera"
                htmlFor="inputFile"
              >
                <FileBase
                  type="file"
                  multiple={true}
                  onDone={(files) => handleFiles(files)}
                />
              </label>
              {errors.imageFile && (
                <p className="text-red-500 text-sm animate-errorAni ml-3 flex gap-2 self-end">
                  {errors.imageFile}
                </p>
              )}
              {imageState.length
                ? imageState.map((image, index) => (
                    <div key={index} className="w-32 h-32 relative">
                      <button
                        type="button"
                        id={index.toString()}
                        onClick={(e) =>
                          filterPreviewImages(
                            (e.target as HTMLButtonElement).id
                          )
                        }
                        className="absolute right-1 top-2"
                      >
                        <XCircleIcon className="w-7 h-w-7 text-red-500"/>
                      </button>
                      <img
                        className="rounded-xl"
                        src={image}
                        alt="Imagem selecionada"
                      />
                    </div>
                  ))
                : ""}
              {errors?.imageError && (
                <p className="text-red-500 text-sm animate-errorAni ml-3 flex gap-2 -mt-4 -mb-4">
                  {errors.imageError}
                </p>
              )}
            </div>
          </div>
          <div className="flex-auto">
            <div className="h-full border-2 rounded-md p-3 border-zinc-400 mb-5">
              <textarea
                className="resize-none w-full h-full border-none outline-none"
                name="descricao"
                placeholder="Descrição"
                value={descricao}
                onChange={inputChange}
              ></textarea>
              {errors.descricao && (
                <p className="error-msg">{errors.descricao}</p>
              )}
            </div>
          </div>
          <div className="w-full m-auto flex justify-between mt-10">
            <button
              className="bg-zinc-300 transition-all duration-400 hover:bg-zinc-200 w-80 block text-center py-3 text-lg px-4 font-bold text-black rounded-md"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
            <button type="submit" className="btn w-80">
              {loading ? "Carregando..." : "Editar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
