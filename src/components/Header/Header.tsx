import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import "../Header/styleHeader.css";
import Modal from "../Modal/Modal";

interface hProps {
  links: Record<string, string>;
  active?: boolean;
}

const Header = ({ links, active }: hProps) => {
  const { user, logout } = useContext(AuthContext);
  const [visible, setVisible] = useState(active ? active : false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <header>
        <div
          className={`box-header conteiner menu ${isMenuOpen ? "ativo" : ""}`}
        >
          <h1>
            <Link to={"/"}>OndeIr</Link>
          </h1>
          <button id="btn-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="hamburger"></span>
          </button>
          <nav className="menu-lista">
            <ul>
              <li>
                <Link className="text-lg font-bold text-black" to={links?.home}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-lg font-bold text-black"
                  state={"recente"}
                  to={links?.postagens}
                >
                  Postagens
                </Link>
              </li>
              {user ? (
                <div className="actions-menu-header">
                  <li id="o">
                    <button
                      className="text-lg font-bold text-black"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </li>
                  <li>
                    <Link
                      className="text-lg font-bold text-black"
                      to={`/perfil/${user.id}`}
                    >
                      Perfil
                    </Link>
                  </li>
                </div>
              ) : isMenuOpen ? (
                <div className="actions-menu-header">
                  <li>
                    <button
                      className="text-lg font-bold text-black"
                      onClick={() => setVisible(true)}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <Link className="btn" to={links?.registrar}>
                      Cadastro
                    </Link>
                  </li>
                </div>
              ) : (
                <div className="actions-menu-header">
                  <li>
                    <button
                      className="text-lg font-bold text-black"
                      onClick={() => setVisible(true)}
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <Link className="btn" to={links?.registrar}>
                      Cadastro
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <Modal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default Header;
