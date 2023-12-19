import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Profile from "../../components/ProfileSection/Profile";

const ProfilePage = () => {
    const linksObj = {
        home: "/",
        sobre: "/",
        postagens: "/postagens",
        registrar: "/cadastro"
    }

    document.title = "OndeIr | Perfil"

    return (
        <>
            <Header links={linksObj}/>
            <Profile />
            <Footer />
        </>
    )
}

export default ProfilePage;