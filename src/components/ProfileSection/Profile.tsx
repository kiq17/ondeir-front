import { useContext, useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { editAvatar, getUser } from "../../services/api";
import "../ProfileSection/styleProfile.css";
/* import Toast from "../Toast/Toast"; */
import { PlusIcon } from "@heroicons/react/24/outline";
import User from "../../assets/user.png";
import PlacesUser from "../PlacesUser/PlaceUser";

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

  let message = "";

  if (location.state) {
    message = location.state;
  }

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await getUser(userId);
      setUserInfo(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFile = async (file: any) => {
    if (!user) return;
    // setLoadingImg(true)
    await editAvatar({ avatar: file.base64 });
    await fetchUser();
    // setLoadingImg(false)
  };

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
  }, [user, message, userId]);


  return (
    <section className="flex gap-28 py-16 conteiner max-lg:flex-wrap">
      <div className="flex flex-col gap-5 items-center w-56 max-lg:m-auto">
        <div className="text-center">
          {loading ? (
            <div className="w-44 h-40 bg-zinc-300 animate-pulse rounded-full"></div>
          ) : (
            <label className="label">
              {user?.id === userId && (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(files) => handleFile(files)}
                />
              )}
              <figure className="relative w-44 h-40">
                {userInfo ? (
                  <img
                    src={userInfo.avatar == "e" ? User : userInfo.avatar}
                    className="cursor-pointer w-full h-full rounded-full border-2 border-transparent transition-all duration-300 shadow-md"
                    alt="avatar"
                  />
                ) : (
                  <img
                    src={User}
                    className="cursor-pointer w-full h-full rounded-full border-2 border-transparent transition-all duration-300 shadow-md"
                    alt="avatar"
                  />
                )}
                <figcaption
                  className={
                    user?.id === userId
                      ? `personal-figcaption active`
                      : `personal-figcaption`
                  }
                >
                  <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                </figcaption>
              </figure>
            </label>
          )}
        </div>
        {loading ? (
          <div className="w-32 h-6 rounded-lg bg-zinc-300 animate-pulse"></div>
        ) : (
          <p className="flex flex-col gap-1 text-center ">
            <span className="text-xl font-bold">{userInfo?.nome}</span>
            {userInfo
              ? `${
                  userInfo.postagens > 0
                    ? userInfo.postagens + " postagens"
                    : userInfo.postagens + " postagem"
                }`
              : ""}
          </p>
        )}
        {loading ? (
          <div className="w-44 h-20 rounded-lg bg-zinc-300 animate-pulse"></div>
        ) : (
          <p className="text-center">{userInfo?.descricao}</p>
        )}
        {loading ? (
          <div className="w-36 h-12 rounded-lg bg-zinc-300 animate-pulse"></div>
        ) : (
          user?.id === userId && (
            <Link className="btn" to={`/perfil/editar/${userId}`}>
              Editar perfil
            </Link>
          )
        )}
      </div>
      <div className="flex flex-col flex-grow">
          {loading ? (
            <div className="w-60 mb-2 h-9 rounded-lg bg-zinc-300 animate-pulse"></div>
          ) : (
            <div className="flex items-center gap-5 mb-2 text-gr font-bold text-xl">
              <p>{user?.id === userId ? "Seus posts" : "Postagens"}</p>
              {user?.id === userId && 
              <div className="text-zinc-400 font-bold text-lg">
                <Link
                  to={"/novo"}
                  className="flex items-center justify-center gap-2"
                >
                  Criar Post
                  <PlusIcon className="w-6 h-6 mb-1" />
                </Link>
              </div>}
            </div>
          )}
        <div className="posts-profile">
          <PlacesUser />
        </div>
      </div>
    </section>
  );
};

export default Profile;
