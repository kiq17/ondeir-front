import { useEffect, useState } from "react";
import { Place } from "../../interfaces/place";
import { getAllPlaces } from "../../services/api";
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
        <section className="h-full conteiner">
            <h3 className="text-gr text-lg font-bold">Mais Avaliados</h3>
            <p className="text-3xl mb-3 font-bold max-sm:text-xl">Melhores lugares do mundo.</p>
            <div className="flex w-full gap-6 flex-wrap max-lg:justify-between">
                {places.length > 0 ? places.map(place => {
                    return (
                        <div className="w-96" key={crypto.randomUUID()}>
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