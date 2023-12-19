import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Place } from "../../interfaces/place";
import { getTags } from "../../services/api";
import Card from "../Card/Card";
import { Select, selectOption } from "../Shared/Select/Select";
import "./stylePosts.css";
import CardSkeleton from "../Shared/Skeleton/CardSkeleton";
import useFetchPlaces from "../Shared/Hooks/useFetchPlaces";

interface Tag {
    id: string;
    label: string;
}

const Posts = () => {
    const location = useLocation();
    const [selectedTags, setSelectedSTags] = useState<Tag[]>([]);
    const [avalibleTags, setAvalibleTags] = useState<selectOption[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<string>(location.state);
    // const [places, setPlaces] = useState<Place[]>([]);
    const [page, setPage] = useState<number>(1);

    const { fetchedPlaces, loading, hasMore } = useFetchPlaces("/posts/all",page, 6, order);

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
    // const fetchPlaces = async (order: string) => {
    //     setLoading(true);
    //     try {
    //         const response = await getAllPlaces(1, 5, order)
    //         setPlaces(response.data);
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     fetchPlaces(order)
    // }, [order])

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await getTags();
                setAvalibleTags(response.data.map(item => ({ label: item, value: crypto.randomUUID() })));
            } catch (error) {
                /*  */
            }
        }

        fetchTags()
    }, [])

    const filteredPlaces = useMemo(() => {
        if (selectedTags.length == 0) {
            return fetchedPlaces;
        } else {
            return fetchedPlaces.filter(item => {
                return selectedTags.some((tag) => item.tags.includes(tag.label));
            })
        }
    }, [selectedTags, fetchedPlaces])

    return (
        <section className="postagens conteiner" style={{ display: "flex", flexDirection: "column", marginTop: "60px", alignItems: "center", minHeight: "100vh", gap: "45px" }} >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap" }}>
                <Select
                    multiple
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id };
                    })}
                    options={avalibleTags}
                    onChange={(tags) => {
                        setSelectedSTags(tags.map(tag => ({ label: tag!.label, id: tag!.value })));
                    }}
                />
                <div className="options-order" style={{ display: "flex", gap: "15px" }}>
                    <label className="check-label"><input type="radio" name="e" checked={order == "recente" ? true : false} onClick={() => {
                        setOrder("recente")
                        setPage(1)
                    }}
                    onChange={() => { }}
                    /> Mais recentes
                    </label>
                    <label className="check-label"><input type="radio" name="e" checked={order == "melhor" ? true : false}
                        onClick={() => {
                            setOrder("melhor")
                            setPage(1)
                        }}
                        onChange={() => { }}
                    />
                        Melhores avaliados
                    </label>
                </div>
            </div>

            <div style={{ display: "flex", gap: "22px", alignItems: "center", width: "100%", flexWrap: "wrap" }}>
                {filteredPlaces.map((place, index) => {
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
                })}
            </div>
            {loading &&
                <div style={{ display: "flex", gap: "22px", alignItems: "center", width: "100%", flexWrap: "wrap" }}>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            }
        </section>
    )
}

export default Posts;