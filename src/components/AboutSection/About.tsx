import imgAbout from "../../assets/imgAbout.png";
import imgAbout2 from "../../assets/imgAbout2.png";

const About = () => {
  return (
    <section className="flex items-center justify-center h-svh conteiner">
      <div className="relative w-[650px] h-[350px] max-tablet:hidden">
        <img className="w-[250px] h-[350px] absolute left-[120px] ml-auto mr-auto" src={imgAbout} alt="Paisagem com um coqueiro" />
        <img className="w-[200px] h-[250px] absolute left-[230px] -bottom-16" src={imgAbout2} alt="Foto de um igreja" />
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div>
          <h3 className="text-gr text-lg font-bold">Sobre nós</h3>
          <p className="text-3xl font-bold max-sm:text-xl">
            Juntos podemos te guiar nessa escolha
          </p>
        </div>
        <p>
          Nem sempre escolher uma viagem é uma tarefa fácil, por isso
          disponibilizamos avaliações de todos os lugares do mundo pelos nossos
          usuários.
        </p>
        <div className="flex mt-7 gap-10">
          <div>
            <p className="text-2xl text-gr font-bold">+3K</p>
            <p>Usuários</p>
          </div>
          <div>
            <p className="text-2xl text-gr font-bold">+5K</p>
            <p>Avaliações</p>
          </div>
          <div>
            <p className="text-2xl text-gr font-bold">+7K</p>
            <p>Interações</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
