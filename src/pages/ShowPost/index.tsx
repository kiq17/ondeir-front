import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ShowPost from "../../components/ShowPost/ShowPost";
import CommentPost from "../../components/Comments/CommentPost";
import { useState } from "react";

const ShowPostPage = () => {
    const { id } = useParams();
    const [stars, setStars] = useState<number>(0);

    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Post"

    return (
        <>
            <Header links={linksObj} />
            <ShowPost params={id!} starChange={value => setStars(value)} />
            <CommentPost params={id!} stars={stars} />
            <Footer />
        </>
    )
}

export default ShowPostPage;