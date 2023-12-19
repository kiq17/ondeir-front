import { useEffect, useState } from "react";
import { Place } from "../../interfaces/place";
import { getAllPlaces } from "../../services/api";
import "../BestSection/styleBest.css";
import Card from "../Card/Card";
import CardSkeleton from "../Shared/Skeleton/CardSkeleton";

const Best = () => {
    // const [loading, setLoading] = useState<boolean>(false);
    const [places, setPlaces] = useState<Place[]>([]);

    const fetchPlaces = async () => {
        // setLoading(true);
        try {
            const response = await getAllPlaces(1, 5, "melhor")
            setPlaces(response.data.slice(0, 3));
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
        }
    }

    useEffect(() => {
        fetchPlaces()
    }, [])


    return (
        <section className="best conteiner" style={{ marginBottom: "100px", height: "100%" }}>
            <h3 className="text-principal">Mais Avaliados</h3>
            <p className="text-about-p">Melhores lugares do mundo.</p>
            <div id="best-cards-s">
                {places.length > 0 ? places.map(place => {
                    return (
                        <div className="box-card" key={crypto.randomUUID()}>
                            <Card
                                descricao={place.descricao}
                                imagem={place.imageFile[0]}
                                alt={"Imagem do card"}
                                data={place.createdAt}
                                criador={place.criadoPor.nome}
                                nomePost={place.titulo}
                                estrelas={place.estrelas}
                                tags={place.tags}
                                id={place._id}
                                userId={place.criadoPor._id}
                            />
                        </div>
                    )
                }) : (
                    <>
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </>
                )}

            </div>
        </section>
    )
}

export default Best;