import { useEffect, useRef, useState } from "react";
import { Place } from "../../interfaces/place";
import { getAllPlaces } from "../../services/api";
import Card from "../Card/Card";
import CardSkeleton from "../Shared/Skeleton/CardSkeleton";
import { motion } from "framer-motion";

const Best = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [width, setWidth] = useState<number>(0);
  const slider = useRef<HTMLDivElement>(null);

  const fetchPlaces = async () => {
    try {
      const response = await getAllPlaces(1, 4, "melhor");
      setPlaces(response.data);
    } catch (error) {
      /*  */
    }
  };

  useEffect(() => {
    fetchPlaces();
    if (slider.current) {
      const value = slider.current.scrollWidth - slider.current.offsetWidth;
      setWidth(value);
    }
  }, []);

  return (
    <section data-testid="best-section" className="h-full conteiner">
      <h3 className="text-gr text-lg font-bold">Mais Avaliados</h3>
      <p className="text-3xl mb-3 font-bold max-sm:text-xl">
        Melhores lugares do mundo.
      </p>
      <motion.div
        className="w-full overflow-hidden cursor-grab"
        ref={slider}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          data-testid="best-slider"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex w-full gap-4"
        >
          {places.length > 0
            ? places.map((place) => {
                return (
                  <motion.div
                    data-testid="card-slider"
                    className="w-96"
                    key={crypto.randomUUID()}
                  >
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
                  </motion.div>
                );
              })
            : Array(4)
                .fill("")
                .map((_, i) => {
                  return (
                    <motion.div
                      key={i}
                      data-testid="skeleton-slider"
                      className="w-96"
                    >
                      <CardSkeleton />
                    </motion.div>
                  );
                })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Best;
