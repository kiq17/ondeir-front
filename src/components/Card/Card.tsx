import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
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
        <div className="flex justify-between rounded-xl flex-col bg-card h-[580px] p-3 shadow-md" key={crypto.randomUUID()}>
            <img className='w-[372px] h-[330px] object-cover rounded-xl' src={imagem} alt={alt} />
            <div className="flex justify-between items-center">
                <h3>{nomePost}</h3>
                <p className='text-zinc-400 text-sm'>Postado por <Link className='underline hover:text-blue-600 transition-colors' to={`/perfil/${userId}`}>{criador}</Link></p>
            </div>
            <div className="tags" style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
                {tags && tags.map(tag => <p style={{ color: "blue" }} key={crypto.randomUUID()}>#{tag}</p>)}
            </div>
            <div className="max-w-[385px] break-words">
                {descricao.length > 120 ? (
                    <p >{descricao.slice(0, 60)}...<Link className='text-blue-600 ml-2' to={`/post/${id}`}>Leia mais</Link></p>
                ) : (
                    <p>{descricao}</p>
                )}
            </div>
            <div className="flex gap-2" style={{ marginTop: "10px" }}>
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
            <div className="flex justify-between items-center">
                <p className='mt-4 text-zinc-400'>{howMuchPass(data)}</p>
                <Link className='font-bold mt-4 text-gr text-sm' to={`/post/${id}`}>Visualizar post →</Link>
            </div>
        </div>
    )
}

export default Card;