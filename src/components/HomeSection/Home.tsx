import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bannerHome from "../../assets/bannerPrincipal.png";
import "../HomeSection/styleHome.css";
import useMediaQuery from "../Shared/Hooks/useMediaQuery";

const Home = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const isMed = useMediaQuery('(min-width: 1150px)');

    useEffect(() => {
        if (imgRef.current) {
            if (imgRef.current.complete) {
                setLoading(false);
            } else {
                imgRef.current.addEventListener("load", () => setLoading(false));
            }
        }
    }, [imgRef, isMed])
    return (
        <section className="flex justify-between items-center max-w-[1200px] m-auto max-lg:h-[500px]">
            <div className="max-w-[600px] max-lg:max-w-[700px] max-lg:m-auto max-lg:mt-auto">
                <h2 className="mb-5 text-5xl font-bold max-lg:text-4xl max-lg:text-center max-lg:mb-2 max-sm:text-2xl max-sm:w-[360px] max-sm:m-auto">Viva a vida que você sempre quis viver.</h2>
                <p className="text-2xl mb-6 text-zinc-500 max-lg:text-xl max-lg:text-center max-sm:text-base max-sm:w-80 max-sm:m-auto max-sm:mb-5 max-sm:mt-2">A vida é curta e o mundo é enorme, então comece agora!</p>
                <Link className="btn max-lg:m-auto max-lg:block max-lg:max-w-[200px] max-lg:text-center" state={"melhor"} to={"/postagens"}>Melhores Lugares</Link>
            </div>
            {isMed && <div className={loading ? "img-banner" : "img-banner load"}>
                <img src={bannerHome} alt="Garota andando por uma rua estreita com casas antigas, com uma mochila" loading="lazy" ref={imgRef} />
            </div>}
        </section>
    )
}

export default Home;