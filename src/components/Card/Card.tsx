import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { howMuchPass } from "../../services/calcDate";

interface CardProps {
  descricao: string;
  imagem: string;
  alt: string;
  data: Date;
  criador: string;
  nomePost: string;
  id?: string;
  tags?: string[];
  estrelas: { media: number };
  userId: string;
}

const Card = ({
  imagem,
  alt,
  nomePost,
  criador,
  descricao,
  data,
  tags,
  id,
  estrelas,
  userId,
}: CardProps) => {
  return (
    <div
      className="flex justify-between rounded-xl flex-col bg-card h-[580px] w-[372px] p-3 shadow-lg"
      key={crypto.randomUUID()}
    >
      <img
        className="w-full h-[330px] object-cover rounded-xl pointer-events-none"
        src={imagem}
        alt={alt}
      />
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-xl font-bold text-gr">{nomePost}</h3>
        <p className="text-zinc-400 text-sm">
          Postado por{" "}
          <Link
            className="underline hover:text-blue-600 transition-colors"
            to={`/perfil/${userId}`}
          >
            {criador}
          </Link>
        </p>
      </div>
      <div className="flex mb-5 gap-3">
        {tags &&
          tags.map((tag) => (
            <p className="text-blue-600" key={crypto.randomUUID()}>
              #{tag}
            </p>
          ))}
      </div>
      <div className="max-w-[385px] break-words">
        {descricao.length > 120 ? (
          <p>
            {descricao.slice(0, 60)}...
            <Link className="text-blue-600 ml-2" to={`/post/${id}`}>
              Leia mais
            </Link>
          </p>
        ) : (
          <p>{descricao}</p>
        )}
      </div>
      <div className="flex gap-2 mt-3">
        {Array(5)
          .fill("")
          .map((_, i) => {
            const starsComplete = Math.ceil(estrelas.media);

            if (starsComplete > i) {
              return <StarIcon key={crypto.randomUUID()} className={`w-5 h-5 text-yellow-400`} />;
            }

            return <StarIcon key={crypto.randomUUID()} className={`w-5 h-5 text-zinc-400`} />;
          })}
      </div>
      <div className="flex justify-between items-center">
        <p className="mt-4 text-zinc-400">{howMuchPass(data)}</p>
        <Link className="font-bold mt-4 text-gr text-sm" to={`/post/${id}`}>
          Visualizar post →
        </Link>
      </div>
    </div>
  );
};

export default Card;
