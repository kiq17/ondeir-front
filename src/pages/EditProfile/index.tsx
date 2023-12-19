import { useParams } from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const EditProfilePage = () => {
    const { userId } = useParams()

    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Editar perfil"

    return (
        <>
            <Header links={linksObj} />
            <EditProfile params={userId} />
            <Footer />
        </>
    )
}

export default EditProfilePage;