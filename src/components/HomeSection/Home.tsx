import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bannerHome from "../../assets/bannerPrincipal.png";
import "../HomeSection/styleHome.css";
import useMediaQuery from "../Shared/Hooks/useMediaQuery";

const Home = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const isMed = useMediaQuery('(min-width: 1150px)');
    const isMobile = useMediaQuery('(min-width: 550px)');

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
        <section className="banner conteiner">
            <div className="banner-texto">
                <h2>Viva a vida que você sempre quis viver.</h2>
                {isMobile && <p>A vida é curta e o mundo é enorme, então comece agora!</p>}
                <Link state={"melhor"} to={"/postagens"}>Melhores Lugares</Link>
            </div>
            {isMed && <div className={loading ? "img-banner" : "img-banner load"}>
                <img src={bannerHome} alt="Garota andando por uma rua estreita com casas antigas, com uma mochila" loading="lazy" ref={imgRef} />
            </div>}
        </section>
    )
}

export default Home;