import { AxiosError } from "axios";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Place } from "../../interfaces/place";
import { editPlace, getPlace } from "../../services/api";
import "../NewPost/stylePost.css";
import { Tags } from "../Shared/Tags/Tags";
import * as yup from "yup";
import { ValidationError } from "yup";

const initialState = {
    titulo: "",
    descricao: "",
    tags: [],
    imageFile: [],
    _id: "",
    criadoPor: { _id: "", nome: "" },
    estrelas: { media: 0 }
}

export const postSchema = yup.object({
    titulo: yup.string().required("Campo obrigatório")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
    descricao: yup.string().required("Campo obrigatório")
        .min(50, "Deve ter no mínimo 20 caracteres")
        .max(1000, "Deve ter no máximo 20 caracteres"),
    tags: yup.array().required("Campo obrigatório")
        .length(3, "Deve ter no mínimo 3 tags")
        .max(5, "Deve ter no máximo 5 tags"),
    imageFile: yup.array().required("Campo obrigatório")
        .min(1, "Deve ter no mínimo 1 imagem")
        .max(4, "Deve ter no máximo 4 imagens")
})

const EditPost = ({ params }) => {
    const [placeData, setPlaceData] = useState<Omit<Place, "_id" | "createdAt">>(initialState);
    const { titulo, descricao, tags, imageFile } = placeData;
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
            postSchema.validateSync({
                titulo,
                descricao,
                tags,
                imageFile
            }, { abortEarly: false })
        } catch (error) {
            const yupError = error as ValidationError;
            const objectErros: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (!error.path) return;

                objectErros[error.path] = error.message;
            });

            setErrors(objectErros)
            return true
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            (inputRef.current.childNodes[0] as HTMLLabelElement).id = "inputFile";
        }

        const fectchPlaceData = async () => {
            try {
                const response = await getPlace(params);
                setPlaceData(response.data);
                setImageState(response.data.imageFile);
                setFetching(false)
            } catch (error) {
                setFetching(false)
            }
        }

        fectchPlaceData();
    }, [errors]);

    if (fetching) {
        return (
            <section className="profile conteiner" key={crypto.randomUUID()}>
                <h3 style={{ margin: "0 auto", padding: "200px" }}>Carregando...</h3>
            </section>
        )
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateSchema()) return
        try {
            if (titulo && descricao) {
                setLoading(true);
                if (user?.id !== undefined) {
                    await editPlace(params, {...placeData, tags: newTags});
                    navigate(`/perfil/${user.id}`, { state: "Postagem editada com sucesso" });
                }
                setLoading(false);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const t = error.response!.data;
                const e = t.error.body
                setErrors(e);
            }
        }
    };




    const inputChange = (e) => {
        const { name, value } = e.target;

        setPlaceData({ ...placeData, [name]: value });
    };

    const handleFiles = (files) => {
        const resultBase = [...files.map(item => item.base64), ...placeData.imageFile];
        if (resultBase.length > 3) {
            setErrors(prev => ({ ...prev, imageError: "Somente quatro imagens são permitidas" }));
            return;
        }
        setImageState(resultBase);
        setPlaceData({ ...placeData, imageFile: [...resultBase] })
    }


    const filterPreviewImages = (id) => {
        setImageState(prev => [...prev.filter(image => image != imageFile[id])]);
    };

    return (
        <section className="post conteiner">
            <div className="post-box">

                <div className="post-texto">
                    <h2>Edite seu post</h2>
                    <p>Preencha os dados abaixo com atenção</p>
                </div>
                <form className="form-post"
                    onSubmit={handleSubmit}
                    onKeyDown={(event) => {
                        if(event.code === "Enter"){
                            event.preventDefault();
                        } 
                    }}>
                    <div className="first-form-post">

                        <div className="input-box" style={{ marginBottom: "35px" }} onClick={(e) => {
                            e.stopPropagation()
                            const inp = ((e.target as HTMLDivElement).childNodes[0] as HTMLInputElement)
                            inp.focus()
                        }}>
                            <input type="text"
                                name="titulo"
                                className="form-input"
                                placeholder=" "
                                value={titulo}
                                onClick={(e) => e.stopPropagation()}
                                onChange={inputChange}
                                autoComplete="off"
                            />
                            <label htmlFor="titulo" className="form-label">Título</label>
                            {errors.titulo && (
                                <p className="error-msg">{errors.titulo}</p>
                            )}
                        </div>
                        <Tags
                            onChange={tags => {
                                setNewTags(tags)
                            }}
                            value={placeData.tags}
                        />
                        {errors.tags && (
                            <p className="error-msg">{errors.tags}</p>
                        )}
                        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                            <label ref={inputRef} className="box-fileInput" htmlFor="inputFile">
                                <FileBase
                                    type="file"
                                    multiple={true}
                                    onDone={(files) => handleFiles(files)}
                                />
                            </label>
                            {errors.imageFile && (
                                <p className="error-msg" style={{ alignSelf: "flex-end", marginBottom: "0px" }}>{errors.imageFile}</p>
                            )}
                            {imageState.length ? (imageState.map((image, index) => (
                                <div key={index}
                                    style={
                                        {
                                            width: "120px",
                                            height: "120px",
                                            position: "relative"
                                        }
                                    }>
                                    <button
                                        type="button"
                                        id={index.toString()}
                                        onClick={e => filterPreviewImages((e.target as HTMLButtonElement).id)}
                                        style={
                                            {
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
                                                bottom: "90px"
                                            }
                                        }
                                    >
                                        X
                                    </button>
                                    <img style={{ borderRadius: "7px" }} src={image} alt="Imagem selecionada" />
                                </div>
                            ))) : ""}
                        </div>
                    </div>
                    <div className="second-form-post">
                        <div className="textArea-box" style={{ marginBottom: "20px" }}>
                            <textarea
                                name="descricao"
                                placeholder="Descrição"
                                value={descricao}
                                onChange={inputChange}>
                            </textarea>
                            {errors.descricao && (
                                <p className="error-msg">{errors.descricao}</p>
                            )}
                        </div>
                    </div>
                    <div style={{ alignContent: "center", margin: "0 auto" }}>
                        <button type="submit">{loading ? "Carregando..." : "Editar"}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditPost;