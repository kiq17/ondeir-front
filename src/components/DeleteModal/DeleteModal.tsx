import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Modal/styleModal.css";
import { FormEvent, useContext } from 'react';
import { deleteUser } from '../../services/api';
import { AuthContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ visible, setVisible, userId }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await deleteUser(userId);
            logout();
            navigate("/", { state: "disable" })
        } catch (error) {
            /*  */
        }
    }

    return (
        <>
            <div id='cover' onClick={(e) => {
                if ((e.target as HTMLDivElement).getAttribute("id")) {
                    setVisible(false)
                }
            }} className={visible ? "conteiner-modal mostrar" : "conteiner-modal"}>
                <div className="modal" style={{ width: "535px" }}>
                    <button id="fechar" onClick={() => setVisible(false)}><FontAwesomeIcon icon={faXmark} /></button>
                    <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "50px" }}>
                        <h3 style={{ marginBottom: "5px" }}>Deseja realmente apagar sua conta?</h3>
                        <p style={{ color: "var(--cor-subtitulo)" }}>Essa ação não pode ser desfeita</p>
                    </div>
                    <form onSubmit={handleSubmit} className="form-box">
                        <fieldset style={{ display: "flex", gap: "10px", outline: "none", border: "none" }}>
                            <button type="submit" className="btn-submit">Sim</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setVisible(false)
                            }} className="btn-submit">Não</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeleteModal;