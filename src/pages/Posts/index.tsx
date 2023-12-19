import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";

const PostsPage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Postagens"

    return (
        <>
            <Header links={linksObj} />
            <Posts />
            <Footer />
        </>
    )
}

export default PostsPage;