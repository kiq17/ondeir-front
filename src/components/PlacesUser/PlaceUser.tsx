import { useState, useCallback, useRef } from "react";
import useFetchPlaces from "../Shared/Hooks/useFetchPlaces";
import Card from "../Card/Card";
import CardSkeleton from "../Shared/Skeleton/CardSkeleton";
import { useParams } from "react-router-dom";


const PlacesUser = () => {
    const [page, setPage] = useState<number>(1);
    const { userId } = useParams();

    const { fetchedPlaces, loading, hasMore } = useFetchPlaces(`/places/user/${userId}`, page, 4, "recente");

    const placeRef = useRef<IntersectionObserver>();
    const handlePlace = useCallback(node => {
        if (loading) return
        if (placeRef.current) placeRef.current.disconnect()

        placeRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1)
            }
        })

        if (node) placeRef.current.observe(node)
    }, [hasMore, loading])

    if (loading) {
        return (
            <>
                <CardSkeleton />
                <CardSkeleton />
            </>
        )
    }

    if (fetchedPlaces.length == 0) {
        return (
            <p style={{ fontSize: "17px", fontWeight: "bold" }}>Não há nada por aqui, clique no butão acima e faça seu primeiro post!</p>
        )
    }

    if (fetchedPlaces.length < 3) {
        return (
            <>
                {fetchedPlaces.map(place => {
                    return (
                        <div style={{ marginBottom: "25px" }} className="box-card" key={crypto.randomUUID()}>
                            <Card
                                key={crypto.randomUUID()}
                                id={place._id}
                                descricao={place.descricao}
                                imagem={place.imageFile[0]}
                                alt={"Imagem do card"}
                                data={place.createdAt}
                                criador={place.criadoPor.nome}
                                nomePost={place.titulo}
                                tags={place.tags}
                                estrelas={place.estrelas}
                                userId={place.criadoPor._id}
                            />
                        </div>
                    )
                })}
            </>
        )
    }


    return (
        <>
            {
                fetchedPlaces.map((place, index) => {
                    if (fetchedPlaces.length === index + 1) {
                        return (
                            <div style={{ marginBottom: "25px" }} className="box-card" key={crypto.randomUUID()}
                                ref={handlePlace}
                            >
                                <Card
                                    key={crypto.randomUUID()}
                                    id={place._id}
                                    descricao={place.descricao}
                                    imagem={place.imageFile[0]}
                                    alt={"Imagem do card"}
                                    data={place.createdAt}
                                    criador={place.criadoPor.nome}
                                    nomePost={place.titulo}
                                    tags={place.tags}
                                    estrelas={place.estrelas}
                                    userId={place.criadoPor._id}
                                />
                            </div>
                        )
                    }

                    return (
                        <div style={{ marginBottom: "25px" }} className="box-card" key={crypto.randomUUID()}>
                            <Card
                                key={crypto.randomUUID()}
                                id={place._id}
                                descricao={place.descricao}
                                imagem={place.imageFile[0]}
                                alt={"Imagem do card"}
                                data={place.createdAt}
                                criador={place.criadoPor.nome}
                                nomePost={place.titulo}
                                tags={place.tags}
                                estrelas={place.estrelas}
                                userId={place.criadoPor._id}
                            />
                        </div>
                    )
                })
            }
        </>
    )
}

export default PlacesUser;