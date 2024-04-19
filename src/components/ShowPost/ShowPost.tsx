import {
  faArrowLeft,
  faArrowRight,
  faPen,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Place } from "../../interfaces/place";
import { Stars } from "../../interfaces/stars";
import { deletePlace, getPlace, sendStars } from "../../services/api";
import "../ShowPost/styleShowPost.css";

import { AxiosError } from "axios";
import Lightbox from "react-spring-lightbox";
import Modal from "../Modal/Modal";
import { howMuchPass } from "../../services/calcDate";

// import plugins if you need

interface DocumentEx extends Element {
  webkitRequestFullscreen: any;
  msRequestFullscreen: any;
}

interface DocumentCopy extends Document {
  webkitExitFullscreen?: any;
  msExitFullscreen?: any;
}

interface PlaceInfo extends Place {
  avaliacoes: number;
}

interface PsotProps {
  params: string;
  starChange: (value: number) => void;
}

interface Img {
  selected: boolean;
  value: string;
}

const ShowPost = ({ params, starChange }: PsotProps) => {
  const { user, logout } = useContext(AuthContext);
  const [place, setPlace] = useState<PlaceInfo>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imagens, setImagens] = useState<Img[]>([]);
  const [starsObj, setStarsObj] = useState<Stars>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const elem: DocumentEx | null = document.querySelector(
      "[data-testid='lightbox-container']"
    );

    if (elem && isOpen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    /* View in fullscreen */

    if (!isOpen) closeFullscreen();

    /* Close fullscreen */
    function closeFullscreen() {
      const documentCopy: DocumentCopy = document;
      if (documentCopy.exitFullscreen && document.fullscreenElement) {
        documentCopy.exitFullscreen();
      } else if (documentCopy.webkitExitFullscreen) {
        documentCopy.webkitExitFullscreen();
      } else if (documentCopy.msExitFullscreen) {
        documentCopy.msExitFullscreen();
      }
    }
  }, [isOpen]);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < imagens.length &&
    setCurrentIndex(currentImageIndex + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlace(params);
        console.log(response.data);
        setPlace(response.data);
        setImagens(
          response.data.imageFile.map((img, i) => {
            if (i == 0) {
              return { selected: true, value: img };
            } else {
              return { selected: false, value: img };
            }
          })
        );
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status == 500) {
            logout();
          }
        }
        setError(true);
      }
    };

    fetchData();
  }, [starsObj]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deletePlace(params);
      navigate(`/perfil/${user?.id}`, {
        state: "Postagem removida com sucesso",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStars = async (star) => {
    if (!user) {
      setVisible(true);

      return;
    }
    switch (star) {
      case 1:
        setStarsObj({
          um: true,
          dois: false,
          três: false,
          quatro: false,
          cinco: false,
        });
        break;
      case 2:
        setStarsObj({
          um: true,
          dois: true,
          três: false,
          quatro: false,
          cinco: false,
        });
        break;
      case 3:
        setStarsObj({
          um: true,
          dois: true,
          três: true,
          quatro: false,
          cinco: false,
        });
        break;
      case 4:
        setStarsObj({
          um: true,
          dois: true,
          três: true,
          quatro: true,
          cinco: false,
        });
        break;
      case 5:
        setStarsObj({
          um: true,
          dois: true,
          três: true,
          quatro: true,
          cinco: true,
        });
        break;
      default:
        break;
    }

    try {
      await sendStars(star, params);
      starChange(star);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    <section className="show-post conteiner">
      <h3>Postagem indisponivel</h3>
    </section>;
  }

  return (
    <>
      <section className="show-post conteiner">
        <div className="img-show">
          <Lightbox
            isOpen={isOpen}
            onPrev={gotoPrevious}
            onNext={gotoNext}
            images={imagens.map((img) => ({
              src: img.value,
              alt: "Imagem selecionada",
              loading: "lazy",
              style: {
                borderRadius: "6px",
              },
            }))}
            currentIndex={currentImageIndex}
            renderHeader={() => (
              <div
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  backgroundColor: "#5f5f5f",
                  color: "white",
                }}
              >
                <div className="text-slide-img">
                  <p>Imagens sobre {place?.titulo}</p>
                  <p>Clique na imagem para dar zoom</p>
                </div>
                <div className="options-slide-img">
                  <p>
                    {currentImageIndex + 1} / {imagens.length}
                  </p>
                  <div className="select-divisor"></div>
                  <FontAwesomeIcon
                    icon={faXmark}
                    color="red"
                    onClick={() => setIsOpen(false)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            )}
            renderPrevButton={({ canPrev }) => (
              <FontAwesomeIcon
                style={{
                  marginLeft: "20px",
                  zIndex: "10000",
                  cursor: `${canPrev ? "pointer" : "not-allowed"}`,
                }}
                size="2x"
                color={canPrev ? "black" : "#9ca3af"}
                icon={faArrowLeft}
                onClick={gotoPrevious}
              />
            )}
            renderNextButton={({ canNext }) => (
              <FontAwesomeIcon
                style={{
                  marginRight: "20px",
                  zIndex: "10000",
                  cursor: `${canNext ? "pointer" : "not-allowed"}`,
                }}
                size="2x"
                color={canNext ? "black" : "#9ca3af"}
                icon={faArrowRight}
                onClick={gotoNext}
              />
            )}
            //  renderImageOverlay={() => (<ImageOverlayComponent >)}
            style={{ background: "grey" }}
            //  onClose={()=> setIsOpen(false)}
            singleClickToZoom
            pageTransitionConfig={{
              from: { transform: "scale(0.75)", opacity: 0 },
              enter: { transform: "scale(1)", opacity: 1 },
              leave: { transform: "scale(0.75)", opacity: 0 },
              config: { mass: 1, tension: 320, friction: 32 },
            }}
          />
          {loading && (
            <div className="w-full h-full bg-zinc-300 animate-pulse rounded-md"></div>
          )}
          {imagens.length == 1 ? (
            <img
              key={crypto.randomUUID()}
              style={{ height: "100%", width: "100%" }}
              src={imagens[0].value}
              alt="Imagem selecionada"
              onClick={() => {
                setIsOpen(true);
                setCurrentIndex(0);
              }}
            />
          ) : (
            imagens.map((img, i) => {
              if (img.selected) {
                return (
                  <img
                    key={crypto.randomUUID()}
                    style={{ height: "70%", width: "100%" }}
                    src={img.value}
                    alt="Imagem selecionada"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentIndex(i);
                    }}
                  />
                );
              } else {
                return (
                  <img
                    key={crypto.randomUUID()}
                    style={{
                      height: "170px",
                      width: "170px",
                      marginRight: "10px",
                    }}
                    src={img.value}
                    alt="Imagem selecionada"
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentIndex(i);
                    }}
                  />
                );
              }
            })
          )}
        </div>
        <div className="flex-1">
          <div className="texto-titulo">
            {loading ? (
              <div className="w-full h-12 bg-zinc-300 animate-pulse rounded-md"></div>
            ) : (
              <h3 className="text-5xl font-bold text-gr">{place?.titulo}</h3>
            )}

            {loading ? (
              <div className="w-40 h-5 mt-3 bg-zinc-300 animate-pulse rounded-md"></div>
            ) : (
              <p>
                Criado por{" "}
                <Link to={`/perfil/${place?.criadoPor._id}`}>
                  {place?.criadoPor.nome}
                </Link>{" "}
                {place ? howMuchPass(place.createdAt) : "..."}
              </p>
            )}
          </div>
          {loading ? (
            <div className="w-full h-96 mt-3 bg-zinc-300 animate-pulse rounded-md"></div>
          ) : (
            <p className="content-textShow">{place?.descricao}</p>
          )}

          <div className="avaliacoes-show">
            <div className="stars" style={{ marginTop: "10px" }}>
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => {
                  handleStars(1);
                }}
                color={starsObj?.um ? "yellow" : "gray"}
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => {
                  handleStars(2);
                }}
                color={starsObj?.dois ? "yellow" : "gray"}
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => {
                  handleStars(3);
                }}
                color={starsObj?.três ? "yellow" : "gray"}
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => {
                  handleStars(4);
                }}
                color={starsObj?.quatro ? "yellow" : "gray"}
                size="lg"
              />
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => {
                  handleStars(5);
                }}
                color={starsObj?.cinco ? "yellow" : "gray"}
                size="lg"
              />
            </div>
            <div className="avaliacoes-stars">
              {place?.avaliacoes ? (
                <p>
                  {place?.avaliacoes == 1
                    ? `${place?.avaliacoes} Avaliação`
                    : place?.avaliacoes > 0
                    ? `${place?.avaliacoes} Avaliações`
                    : "Sem avaliações"}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          {user ? (
            place?.criadoPor._id == user.id ? (
              <div className="actions-show">
                <Link to={`/editar/${place?._id}`}>
                  <FontAwesomeIcon icon={faPen} />
                  Editar
                </Link>
                <form onSubmit={handleDelete}>
                  <button type="submit">
                    <FontAwesomeIcon icon={faXmark} />
                    Excluir
                  </button>
                </form>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </section>
      <Modal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default ShowPost;
