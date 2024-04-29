import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DisclaimerBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const alreadyClick = localStorage.getItem("doc");

    if (alreadyClick) {
      const passedDays = +alreadyClick - new Date().getDate();
      if (Math.abs(passedDays) > 7) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, []);

  function handleClick() {
    localStorage.setItem("doc", new Date().getDate().toString());
    setIsOpen(false);
  }

  return (
    <>
      {isOpen ? (
        <div className="flex items-center justify-between w-full gap-4 fixed bottom-0 bg-zinc-300 py-5 px-20">
          <p>
            Para uma melhor experiência durante o acesso ao site consulte a
            documentação
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="btn"
              target="_blank"
              to={"https://github.com/kiq17/ondeir-front"}
            >
              Acessar
            </Link>
            <button
              className="py-3 px-4 font-bold border-2 border-black bg-transparent rounded-md"
              type="button"
              onClick={handleClick}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DisclaimerBar;
