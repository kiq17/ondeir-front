import { useLocation } from "react-router-dom";
import About from "../../components/AboutSection/About";
import Best from "../../components/BestSection/Best";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Home from "../../components/HomeSection/Home";

const HomePage = () => {


    const linksObj = {
        home: "#",
        sobre: "#sobre",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    const location = useLocation();
    
    /* if (location.state === "active") {
        setVisible(true)
    } */

    document.title = "OndeIr | Home"

    return (
        <>
            <Header links={linksObj} active={location.state === "active"} />
            <Home />
            <About />
            <Best />
            <Footer />
        </>
    )
}

export default HomePage