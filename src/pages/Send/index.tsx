import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Send from "../../components/Send/Send";

const SendPage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Enviar email"

    return (
        <>
            <Header links={linksObj}/>
            <Send />
            <Footer />
        </>
    )
}

export default SendPage;