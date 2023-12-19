import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ValidationError } from "yup";
import { redefine } from "../../services/api";
import "../ChangePass/styleChangePass.css";

export const passSchema = yup.object({
    newPass: yup.string().required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no mínimo 20 caracteres"),
    newPassConfirm: yup.string().required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no mínimo 20 caracteres")

})

const RedefinePass = ({ params }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [newPass, setNewPass] = useState<string>("");
    const [newPassConfirm, setNewPassConfirm] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const validateSchema = () => {
        try {
            passSchema.validateSync({
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
            await redefine({ senha: newPassConfirm }, params);
            navigate(`/`, { state: "active" })
            setLoading(false);
        } catch (error) {
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
                            <div className="input-box" style={{ marginBottom: "35px" }} onClick={(e) => {
                                e.stopPropagation()
                                const inp = ((e.target as HTMLDivElement).childNodes[0] as HTMLInputElement)
                                inp.focus()
                            }}>
                                <input type="password"
                                    name="Nova senha"
                                    className="form-input"
                                    placeholder=" "
                                    onClick={(e) => e.stopPropagation()}
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    autoComplete="off"
                                />
                                <label htmlFor="Nova senha" className="form-label">Nova senha</label>
                                {errors.newPass && (
                                    <p className="error-msg">{errors.newPass}</p>
                                )}
                            </div>
                            <div className="input-box" style={{ marginBottom: "35px" }} onClick={(e) => {
                                e.stopPropagation()
                                const inp = ((e.target as HTMLDivElement).childNodes[0] as HTMLInputElement)
                                inp.focus()
                            }}>
                                <input type="password"
                                    name="Confirmar nova senha"
                                    className="form-input"
                                    placeholder=" "
                                    onClick={(e) => e.stopPropagation()}
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
                            <button className="edit-profile-btn" type="submit">{loading ? "Carregando..." : "Salvar"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default RedefinePass;