import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RedefinePass from "../../components/RedfinePass/RedefinePass";

const RedefinePassPage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    const { userId } = useParams()

    document.title = "OndeIr | Redefinir senha"

    return (
        <>
            <Header links={linksObj} />
            <RedefinePass params={userId} />
            <Footer />
        </>
    )
}

export default RedefinePassPage;