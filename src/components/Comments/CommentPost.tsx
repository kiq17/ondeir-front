import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import userImg from "../../assets/user.png";
import { createComment, getComments, getPlace, toggleLikeComment } from "../../services/api";
import "../Comments/styleCommentPost.css";
import { IStars, StarsDto, mathReview } from "./mathReview";
import { Comment } from "../../interfaces/comment";
import Modal from '../Modal/Modal';
import { AuthContext } from '../../context/auth';
import { howMuchPass } from '../../services/calcDate';

interface CProps {
    params: string;
    stars: number;
}

const CommentPost = ({ params, stars }: CProps) => {
    const { user } = useContext(AuthContext);
    const [comentarios, setComentarios] = useState<Comment[]>([]);
    const [estrelasObj, setEstrelasObj] = useState<IStars>();
    const [mediaEstrelas, setMediaEstrelas] = useState<StarsDto>();
    const [commentText, setCommentText] = useState("");
    const [visible, setVisible] = useState(false);
    const [reaload, setReload] = useState(false);


    const fetchComments = async () => {
        try {
            const response = await getComments(params);
            setComentarios(response.data);
            setReload(false)
        } catch (error) {
            /*  */
        }
    }

    useEffect(() => {
        fetchComments();
    }, [reaload])

    const fetchPlaceStars = async () => {

        try {
            const response = await getPlace(params);
            const { estrelas } = response.data;
            setEstrelasObj(estrelas);

            const returnCalc = mathReview(estrelas);
            setMediaEstrelas(returnCalc);
        } catch (error) {
            /*  */
        }
    }

    useEffect(() => {
        // fetchComments();
        fetchPlaceStars();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stars])

    const sendComment = async (e) => {
        e.preventDefault();

        if (!user) {
            setVisible(true);

            return
        }

        if (commentText.length == 0) return

        const commentObj = {
            texto: commentText,
        }
        try {
            await createComment(commentObj, params);
            setCommentText("");
            fetchComments();
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async (commentId: string) => {
        // toggle like
        if (!user) {
            setVisible(true);

            return
        }

        try {
            await toggleLikeComment({ action: "like" }, commentId);
            setReload(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislike = async (commentId: string) => {
        // toggle dislike
        if (!user) {
            setVisible(true);

            return
        }

        try {
            await toggleLikeComment({ action: "dislike" }, commentId);
            setReload(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className="coment-box conteiner">
                <div className="comentarios">
                    <form onSubmit={sendComment}>
                        <textarea name="texto" value={commentText} onChange={(e) => setCommentText(e.target.value)}
                            onClick={() => {
                                if (!user) {
                                    setVisible(true)
                                }
                            }}
                        ></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                    {comentarios.length > 0 ? (comentarios.map((comentario, index) => (
                        <div key={index} className="comentario-single" style={{ marginBottom: "50px" }}>
                            <div className="img-coment">
                                <img src={comentario.userId.avatar == "e" ? userImg : comentario.userId.avatar} alt="Foto de perfil" />
                            </div>
                            <div className="coment-user">
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "17px"
                                            }}
                                        >{comentario.userId.nome}</p>
                                        <p
                                            style={{
                                                color: "#767676"
                                            }}>{comentario.userId.estado}</p>

                                    </div>
                                    <p style={{
                                        color: "#767676"
                                    }}>{howMuchPass(comentario.createdAt)}</p>
                                </div>
                                <p
                                    style={{
                                        marginTop: "20px",
                                        maxWidth: "500px",
                                        wordWrap: "break-word"
                                    }}
                                >{comentario.texto}</p>
                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <FontAwesomeIcon className='ftlike' icon={faThumbsUp} style={{ cursor: "pointer" }} onClick={() => handleLike(comentario._id)} />
                                        <p style={{ color: "black" }}>{comentario.likes}</p>
                                    </div>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <FontAwesomeIcon className='ftdislike' icon={faThumbsDown} style={{ cursor: "pointer" }} onClick={() => handleDislike(comentario._id)} />
                                        <p style={{ color: "black" }}>{comentario.dislikes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : <></>}
                </div>
                <div className="avaliacao-coment">
                    {mediaEstrelas ? (
                        <h3>{isNaN(mediaEstrelas.media) ? "Sem avaliações" : mediaEstrelas.media.toString().slice(0, 3)}</h3>
                    ) : <p style={{ fontSize: "20px", fontWeight: 700 }}>Carregando...</p>}

                    <p>Nota média</p>
                    <div className="qtd-stars">
                        <p>5 estrelas</p>
                        <div className="star-progress" style={{ width: "200px", backgroundColor: "gainsboro", height: "10px", borderRadius: "7px" }}>

                            <div className="star-progress" style={{ width: mediaEstrelas?.qtdEstrelas && `${mediaEstrelas?.qtdEstrelas.find(item => Object.keys(item)[0] == "cinco")?.cinco}%`, backgroundColor: "yellow", height: "10px", borderRadius: "7px" }}></div>
                        </div>
                        <p>{estrelasObj?.cinco}</p>
                    </div>
                    <div className="qtd-stars">
                        <p>4 estrelas</p>
                        <div className="star-progress" style={{ width: "200px", backgroundColor: "gainsboro", height: "10px", borderRadius: "7px" }}>

                            <div className="star-progress" style={{ width: mediaEstrelas?.qtdEstrelas && `${mediaEstrelas.qtdEstrelas.find(item => Object.keys(item)[0] == "quatro")?.quatro}%`, backgroundColor: "yellow", height: "10px", borderRadius: "7px" }}></div>
                        </div>
                        <p>{estrelasObj?.quatro}</p>
                    </div>
                    <div className="qtd-stars">
                        <p>3 estrelas</p>
                        <div className="star-progress" style={{ width: "200px", backgroundColor: "gainsboro", height: "10px", borderRadius: "7px" }}>

                            <div className="star-progress" style={{ width: mediaEstrelas?.qtdEstrelas && `${mediaEstrelas.qtdEstrelas.find(item => Object.keys(item)[0] == "três")?.três}%`, backgroundColor: "yellow", height: "10px", borderRadius: "7px" }}></div>
                        </div>
                        <p>{estrelasObj?.três}</p>
                    </div>
                    <div className="qtd-stars">
                        <p>2 estrelas</p>
                        <div className="star-progress" style={{ width: "200px", backgroundColor: "gainsboro", height: "10px", borderRadius: "7px" }}>

                            <div className="star-progress" style={{ width: mediaEstrelas?.qtdEstrelas && `${mediaEstrelas.qtdEstrelas.find(item => Object.keys(item)[0] == "dois")?.dois}%`, backgroundColor: "yellow", height: "10px", borderRadius: "7px" }}></div>
                        </div>
                        <p>{estrelasObj?.dois}</p>
                    </div>
                    <div className="qtd-stars">
                        <p style={{ marginRight: "10px" }}>1 estrela</p>
                        <div className="star-progress" style={{ width: "200px", backgroundColor: "gainsboro", height: "10px", borderRadius: "7px" }}>

                            <div className="star-progress" style={{ width: mediaEstrelas?.qtdEstrelas && `${mediaEstrelas.qtdEstrelas.find(item => Object.keys(item)[0] == "um")?.um}%`, backgroundColor: "yellow", height: "10px", borderRadius: "7px" }}>

                            </div>
                        </div>
                        <p>{estrelasObj?.um}</p>
                    </div>
                </div>
            </section >
            <Modal
                visible={visible}
                setVisible={setVisible}
            />
        </>
    )
}

export default CommentPost;