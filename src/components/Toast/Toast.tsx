import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../Toast/styleToast.module.css";


const Toast = ({ tipo, msg }) => {
    const [isVisivle, setIsVisivle] = useState(false);

    setTimeout(() => {
        setIsVisivle(true);
    }, 4000);

    return (
        <div
            className={isVisivle ? styles.toastMsg + " " + styles.removeMsg : styles.toastMsg}
            style={tipo == "Sucesso" ? { borderLeft: "10px solid green" } : { borderLeft: "10px solid red" }}>

            <div className="text-msg">
                <p>{tipo}</p>
                <p>{msg}</p>
            </div>
            <div className="icon-error">
                {tipo == "Sucesso" ? (
                    <FontAwesomeIcon icon={faCheck}
                        color="green"
                        size="lg" />
                ) : (
                    <FontAwesomeIcon icon={faExclamation}
                        color="red"
                        size="lg" />
                )}

            </div>
        </div>
    );
}

export default Toast;