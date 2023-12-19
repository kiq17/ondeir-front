import { Link } from "react-router-dom";
import "../Footer/styleFooter.css";
import useMediaQuery from "../Shared/Hooks/useMediaQuery";

const Footer = () => {
    const isMobile = useMediaQuery('(min-width: 550px)');

    return (
        <footer className="conteiner">
            <div className="logo-footer">
                <h3>OndeIr</h3>
            </div>
            {isMobile && <div className="mapa-site">
                <h3>Mapa do Site</h3>
                <ul>
                    <li> <a href="/">Home</a></li>
                    <li><Link state={"recente"} to={"/postagens"}>Postagens</Link></li>
                </ul>
            </div>}
            <div className="rede-sociais">
                <h3>Rede Sociais</h3>
                <ul>
                    <li> <a href="">Facebook</a></li>
                    <li> <a href="">Youtube</a></li>
                    <li> <a href="">Instagram</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;