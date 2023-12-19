import imgAbout from "../../assets/imgAbout.png";
import imgAbout2 from "../../assets/imgAbout2.png";
import "../AboutSection/styleAbout.css";
import useMediaQuery from "../Shared/Hooks/useMediaQuery";

const About = () => {
    const isMobile = useMediaQuery('(min-width: 820px)');

    return (
        <section className="about conteiner" id="#sobre">
            {isMobile && <div className="img-content">
                <img className="img1" src={imgAbout} alt="Paisagem com um coqueiro" />
                <img className="img2" src={imgAbout2} alt="Foto de um igreja" />
            </div>}
            <div className="about-text">
                <div>
                    <h3 className="text-principal">Sobre nós</h3>
                    <p className="text-about-p">Juntos podemos te guiar nessa escolha</p>
                </div>
                <p>Nem sempre escolher uma viagem é uma tarefa fácil, por isso disponibilizamos avaliações de todos os lugares do mundo pelos nossos usuários.</p>
                <div className="statistic">
                    <div className="statistic-single">
                        <p>+3K</p>
                        <p>Usuários</p>
                    </div>
                    <div className="statistic-single">
                        <p>+5K</p>
                        <p>Avaliações</p>
                    </div>
                    <div className="statistic-single">
                        <p>+7K</p>
                        <p>Interações</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;