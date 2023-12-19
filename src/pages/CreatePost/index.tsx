import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Post from "../../components/NewPost/Post";

const NewPostPage = ()=>{
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Criar Post"

    return(
        <>
            <Header links={linksObj}/>
            <Post/>
            <Footer/>
        </>
    )
}

export default NewPostPage;