import { XMarkIcon } from "@heroicons/react/20/solid";
import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { deleteUser } from "../../services/api";

const DeleteModal = ({ visible, setVisible, userId }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deleteUser(userId);
      logout();
      navigate("/", { state: "disable" });
    } catch (error) {
      /*  */
    }
  };

  return (
    <>
      <div
        id="cover"
        onClick={(e) => {
          if ((e.target as HTMLDivElement).getAttribute("id")) {
            setVisible(false);
          }
        }}
        className={
          visible
            ? "conteiner-modal"
            : "h-screen fixed top-0 left-0 hidden justify-center items-center w-full z-[1000] bg-black bg-opacity-50 animate-fundo"
        }
      >
        <div className="modal" style={{ width: "535px" }}>
          <button id="fechar" onClick={() => setVisible(false)}>
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div
          className="flex flex-col items-center my-10"
          >
            <h3 className="font-bold text-3xl mb-8">
              Deseja realmente apagar sua conta?
            </h3>
            <p className="text-zinc-500">
              Essa ação não pode ser desfeita
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
            <fieldset
            className="flex gap-3"
            >
              <button type="submit" className="btn">
                Sim
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setVisible(false);
                }}
                className="btn"
              >
                Não
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
