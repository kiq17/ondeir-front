import { useParams } from "react-router-dom";
import ChangePass from "../../components/ChangePass/ChangePass";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const ChangePassPage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    const { userId } = useParams()

    document.title = "OndeIr | Editar senha"

    return (
        <>
            <Header links={linksObj} />
            <ChangePass params={userId} />
            <Footer />
        </>
    )
}

export default ChangePassPage;