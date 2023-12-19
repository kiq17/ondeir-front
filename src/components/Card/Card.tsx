import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "../Card/styleCard.css";
import { howMuchPass } from '../../services/calcDate';

interface CardProps {
    descricao: string;
    imagem: string;
    alt: string;
    data: Date;
    criador: string;
    nomePost: string;
    id?: string;
    tags?: string[];
    estrelas: { media: number }
    userId: string
}

const Card = ({ imagem, alt, nomePost, criador, descricao, data, tags, id, estrelas, userId}: CardProps) => {

    const navigate = useNavigate();

    return (
        <div className="card-single" key={crypto.randomUUID()}>
            <img src={imagem} alt={alt} />
            <div className="title-card">
                <h3>{nomePost}</h3>
                <p>Postado por <Link to={`/perfil/${userId}`}>{criador}</Link></p>
            </div>
            <div className="tags" style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
                {tags && tags.map(tag => <p style={{ color: "blue" }} key={crypto.randomUUID()}>#{tag}</p>)}
            </div>
            <div className="descricao">
                {descricao.length > 120 ? (
                    <p>{descricao.slice(0, 60)}...<Link to={`/post/${id}`}>Leia mais</Link></p>
                ) : (
                    <p>{descricao}</p>
                )}
            </div>
            <div className="stars" style={{ marginTop: "10px" }}>
                <FontAwesomeIcon onClick={()=> navigate(`/post/${id}`)} icon={faStar} color={
                    estrelas ? Math.ceil(estrelas.media) >= 1 ? "yellow" : "gray" : "gray"
                } />
                <FontAwesomeIcon onClick={()=> navigate(`/post/${id}`)} icon={faStar} color={
                    estrelas ? Math.ceil(estrelas.media) >= 2 ? "yellow" : "gray" : "gray"
                } />
                <FontAwesomeIcon onClick={()=> navigate(`/post/${id}`)} icon={faStar} color={
                    estrelas ? Math.ceil(estrelas.media) >= 3 ? "yellow" : "gray" : "gray"
                } />
                <FontAwesomeIcon onClick={()=> navigate(`/post/${id}`)} icon={faStar} color={
                    estrelas ? Math.ceil(estrelas.media) >= 4 ? "yellow" : "gray" : "gray"
                } />
                <FontAwesomeIcon onClick={()=> navigate(`/post/${id}`)} icon={faStar} color={
                    estrelas ? Math.ceil(estrelas.media) == 5 ? "yellow" : "gray" : "gray"
                } />
            </div>
            <div className="data">
                <p>{howMuchPass(data)}</p>
                <Link to={`/post/${id}`}>Visualizar post →</Link>
            </div>
        </div>
    )
}

export default Card;