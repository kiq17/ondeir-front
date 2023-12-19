import { useParams } from "react-router-dom";
import EditPost from "../../components/EditPost/EditPost";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const EditPostPage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Editar Post"
    
    const { id } = useParams()
    
    return (
        <>
            <Header links={linksObj} />
            <EditPost params={id} />
            <Footer />
        </>
    )
}

export default EditPostPage;