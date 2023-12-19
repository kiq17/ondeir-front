import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import "../Modal/styleModal.css";

const initialState = {
    email: "",
    password: ""
}

const Modal = ({ visible, setVisible }) => {
    const { login, errorLogin, loading } = useContext(AuthContext);
    const [formValue, setFormValue] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState(false);
    const [check, setCheck] = useState<string>("");
    const { email, password } = formValue;

    useEffect(() => {
        return () => {
            setCheck("");
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            login(formValue);
            setCheck(errorLogin.status);
        } else {
            return setErrorMsg(true);
        }
    }

    const handleInputChange = (e: ChangeEvent) => {
        const { name, value } = (e.target as HTMLInputElement);
        setErrorMsg(false)
        setFormValue({ ...formValue, [name]: value });
    }

    return (
        <>
            <div id='cover' onClick={(e) => {
                if ((e.target as HTMLDivElement).getAttribute("id")) {
                    setVisible(false)
                }
            }} className={visible ? "conteiner-modal mostrar" : "conteiner-modal"}>
                <div className="modal">
                    <button id="fechar" onClick={() => setVisible(false)}><FontAwesomeIcon icon={faXmark} /></button>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit} className="form-box">
                        <div className={errorMsg || errorLogin.status === "email" ? "input-box error-input" : "input-box"} style={{ marginBottom: "0px" }} onClick={(e) => {
                            e.stopPropagation()
                            const inp = ((e.target as HTMLDivElement).childNodes[0] as HTMLInputElement)
                            inp.focus()
                        }}>
                            <input type="email"
                                name="email"
                                className="form-input"
                                placeholder=" "
                                value={email}
                                onClick={(e) => e.stopPropagation()}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <label htmlFor="email" className="form-label">Email</label>
                        </div>
                        <div className={errorMsg || errorLogin.status === "email" ? "input-box error-input" : "input-box"} style={{ marginBottom: "0px" }}>
                            <input type="password"
                                name="password"
                                className="form-input"
                                placeholder=" "
                                value={password}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <label htmlFor="password" className="form-label">Senha</label>
                        </div>

                        {errorMsg && (
                            <p className="error-msg">Preencha os campos</p>
                        )}

                        {errorLogin.status === "email" && (
                            <p className="error-msg">{errorLogin.message}</p>
                        )}
                        {check === "unauthorized" && (
                            <p style={{ fontSize: "13px" }}>Sua conta ainda não foi verificada. <Link style={{ color: "blue", marginLeft: "5px", fontSize: "13px" }} to={`/verificacao/${errorLogin.message}`}>Clique aqui</Link></p>
                        )}
                        <button type="submit" className="btn-submit">{loading ? "Carregando..." : "Entrar"}</button>
                        <p className="reg">Não tem uma conta?<a href="/cadastro">Inscreva-se</a></p>
                        <Link to={"/enviar"}>Esqueceu sua senha?</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Modal;