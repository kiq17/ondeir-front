import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { changePass } from "../../services/api";
import "./styleChangePass.css";

export const passSchema = yup.object({
    currentPass: yup.string().required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no mínimo 20 caracteres"),
    newPass: yup.string().required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no mínimo 20 caracteres"),
    newPassConfirm: yup.string().required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no mínimo 20 caracteres")

})

const ChangePass = ({ params }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPass, setCurrentPass] = useState<string>("");
    const [newPass, setNewPass] = useState<string>("");
    const [newPassConfirm, setNewPassConfirm] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateSchema = () => {
        try {
            passSchema.validateSync({
                currentPass,
                newPass,
                newPassConfirm
            }, { abortEarly: false })
        } catch (error) {
            const yupError = error as ValidationError;
            const objectErros: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (!error.path) return;

                objectErros[error.path] = error.message;
            });

            setErrors(objectErros)
            return true
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateSchema()) return
        if (newPass !== newPassConfirm) {
            setErrors({ newPassConfirm: "As senhas estão diferente" })
            return
        }
        try {
            setLoading(true);
            await changePass({ senha: currentPass, novaSenha: newPassConfirm });
            navigate(`/perfil/${params}`)
            setLoading(false);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrors({ wrongpass: "Senha inválida" });
            }
            setLoading(false);
        }
    };

    return (
        <section className="change-pass conteiner">
            <div className="change-pass-box">
                <div className="change-pass-content">
                    <div className="change-pass-texto">
                        <h2>Redefinir senha</h2>
                        <p>Preencha os dados abaixo com atenção</p>
                    </div>
                    <form className="change-pass-form" onSubmit={handleSubmit}>
                        <div className="change-pass-first-form">
                            <div className="input-box" style={{ marginBottom: "35px" }}>
                                <input type="password"
                                    name="Senha atual"
                                    className="form-input"
                                    placeholder=" "
                                    value={currentPass}
                                    onChange={(e) => setCurrentPass(e.target.value)}
                                    autoComplete="off"
                                />
                                <label htmlFor="Senha atual" className="form-label">Senha atual</label>
                                {errors.currentPass && (
                                    <p className="error-msg">{errors.currentPass}</p>
                                )}
                                {errors.wrongpass && (
                                    <p className="error-msg">{errors.wrongpass}</p>
                                )}
                            </div>
                            <div className="input-box" style={{ marginBottom: "35px" }}>
                                <input type="password"
                                    name="Nova senha"
                                    className="form-input"
                                    placeholder=" "
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    autoComplete="off"
                                />
                                <label htmlFor="Nova senha" className="form-label">Nova senha</label>
                                {errors.newPass && (
                                    <p className="error-msg">{errors.newPass}</p>
                                )}
                            </div>
                            <div className="input-box" style={{ marginBottom: "35px" }}>
                                <input type="password"
                                    name="Confirmar nova senha"
                                    className="form-input"
                                    placeholder=" "
                                    value={newPassConfirm}
                                    onChange={(e) => setNewPassConfirm(e.target.value)}
                                    autoComplete="off"
                                />
                                <label htmlFor="Confirmar nova senha" className="form-label">Confirmar nova senha</label>
                                {errors.newPassConfirm && (
                                    <p className="error-msg">{errors.newPassConfirm}</p>
                                )}
                            </div>
                        </div>
                        <div style={{ alignContent: "center", margin: "0 auto", width: "400px" }}>
                            <button className="edit-profile-btn" type="submit">{loading ? "Carregando..." : "Editar"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ChangePass;