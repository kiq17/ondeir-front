import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="max-w-[1200px] m-auto flex justify-between max-sm:max-w-[310px] max-lg:max-w-[900px] py-5">
      <div className="text-3xl text-gr mb-2 font-bold text-center">
        <h3>OndeIr</h3>
      </div>
      <div className="max-sm:hidden">
          <h3 className="font-bold text-lg">Mapa do Site</h3>
          <ul>
            <li>
              {" "}
              <a className="hover:underline text-zinc-500" href="/">
                Home
              </a>
            </li>
            <li>
              <Link
                className="hover:underline text-zinc-500"
                state={"recente"}
                to={"/postagens"}
              >
                Postagens
              </Link>
            </li>
          </ul>
        </div>
      <div>
        <h3 className="font-bold text-lg">Rede Sociais</h3>
        <ul>
          <li>
            {" "}
            <a className="hover:underline text-zinc-500" href="">
              Facebook
            </a>
          </li>
          <li>
            {" "}
            <a className="hover:underline text-zinc-500" href="">
              Youtube
            </a>
          </li>
          <li>
            {" "}
            <a className="hover:underline text-zinc-500" href="">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
