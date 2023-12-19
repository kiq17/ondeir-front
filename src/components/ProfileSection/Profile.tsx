import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { editAvatar, getUser } from "../../services/api";
import "../ProfileSection/styleProfile.css";
/* import Toast from "../Toast/Toast"; */
import User from "../../assets/user.png";
import PlacesUser from '../PlacesUser/PlaceUser';

interface UserInfo {
    nome: string;
    avatar: string;
    descricao?: string;
    postagens: number;
}

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    // const [loadingImg, setLoadingImg] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const location = useLocation();

    const { userId } = useParams();


    let message = ""

    if (location.state) {
        message = location.state;
    }

    const fetchUser = async () => {
        setLoading(true)
        try {
            const response = await getUser(userId);
            setUserInfo(response.data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFile = async (file: any) => {
        if (!user) return
        // setLoadingImg(true)
        await editAvatar({ avatar: file.base64 });
        await fetchUser();
        // setLoadingImg(false)
    }

    useEffect(() => {
        // const fetchData = async () => {
        //     setLoading(true)
        //     try {
        //         const response = await getAllPlacesByUser(1, 1, userId!)
        //         setPlaces(response.data)
        //         setLoading(false)
        //     } catch (error) {
        //         setLoading(false)
        //     }
        // }
        // fetchData();
        fetchUser();
    }, [user, message, userId])

    if (loading) {
        return (
            <section className="profile conteiner" key={crypto.randomUUID()}>
                <h3 style={{ margin: "0 auto", padding: "200px" }}>Carregando...</h3>
            </section>
        )
    }

    return (
        <section className="profile conteiner">
            <div className="info-profile">

                <div className="personal-image">
                    <label className="label">
                        {user?.id === userId && <FileBase
                            type="file"
                            multiple={false}
                            onDone={(files) => handleFile(files)}
                        />}
                        <figure className="personal-figure">
                            {userInfo ? (
                                <img src={userInfo.avatar == "e" ? User : userInfo.avatar} className="personal-avatar" alt="avatar" />
                            ) : (<img src={User} className="personal-avatar" alt="avatar" />)}
                            <figcaption className={user?.id === userId ? `personal-figcaption active` : `personal-figcaption`}>
                                <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                            </figcaption>
                        </figure>
                    </label>
                </div>
                <p style={{ display: "flex", flexDirection: "column", gap: "5px" }}><span style={{ fontSize: "20px", fontWeight: 700 }}>{userInfo?.nome}</span> {userInfo ? `${userInfo.postagens > 0 ? userInfo.postagens + ' postagens' : userInfo.postagens + ' postagem'}` : ""}</p>
                <p>{userInfo?.descricao}</p>
                {user?.id === userId && <Link className='btn-profile' to={`/perfil/editar/${userId}`}>Editar perfil</Link>}
            </div>
            <div className="profile-content">
                <div className="profile-actions">
                    <p>Seus posts</p>
                    {user?.id === userId ? (
                        <div className="actions-profile">
                            <Link to={"/novo"} className="new-post">
                                Criar Post
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Link>
                        </div>
                    ) : ""}
                </div>
                <div className="posts-profile">
                    <PlacesUser/>
                </div>
            </div>
            {/* {message && <Toast tipo={"Sucesso"} msg={message} />} */}
        </section>
    )
}

export default Profile;