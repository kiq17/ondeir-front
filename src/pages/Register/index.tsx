import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RegisterSection from "../../components/RegisterSection/Register";

const RegisterPage = () => {


    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Registro"

    return (
        <>
            <Header links={linksObj}/>
            <RegisterSection />
            <Footer/>
        </>
    )
}

export default RegisterPage;