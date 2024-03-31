import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { AxiosError } from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";
import { AuthContext } from "../../context/auth";
import { createPalce } from "../../services/api";
import { postSchema } from "../EditPost/EditPost";
import { Input } from "../Input";
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
    <section className="py-16 conteiner">
      <div className="flex flex-col justify-center gap-5">
        <div className="text-center m-auto mb-8">
          <h2 className="text-3xl font-bold text-gr">Crie seu post</h2>
          <p className="text-zinc-400">Compartilhe sua experiência conosco</p>
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
            <div className="flex gap-5 flex-wrap">
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
                        className="w-5 p-1 h-5 flex items-center rounded-full absolute right-1 bottom-20"
                      >
                        X
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
                    "text-red-500 text-sm animate-errorAni mt-4 flex gap-2"
                  }
                >
                  <ExclamationCircleIcon className="h-5 w-5" />
                  {errors.descricao}
                </p>
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
              {loading ? "Carregando..." : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Post;
