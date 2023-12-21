import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../global.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChangePassPage from "./pages/ChangePass";
import NewPostPage from "./pages/CreatePost";
import EditPostPage from "./pages/EditPost";
import EditProfilePage from "./pages/EditProfile";
import HomePage from "./pages/Home";
import PostsPage from "./pages/Posts";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import ShowPostPage from "./pages/ShowPost";
import VerficationPage from "./pages/Verification";
import SendPage from "./pages/Send";
import RedefinePassPage from "./pages/RedefinePass";

function App() {

  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<RegisterPage />} path="/cadastro" />

      <Route element={<PrivateRoute redirect="/" />} >
        <Route element={<NewPostPage />} path="/novo" />
      </Route>

      <Route element={<PrivateRoute redirect="/" />} >
        <Route element={<EditPostPage />} path="/editar/:id" />
      </Route>

      <Route element={<PostsPage />} path="/postagens" />
      <Route element={<ProfilePage />} path="/perfil/:userId" />
      <Route element={<ShowPostPage />} path="/post/:id" />
      <Route element={<SendPage />} path="/enviar" />

      <Route element={<VerficationPage />} path="/verificacao/:temp" />
      <Route element={<RedefinePassPage />} path="/redefinir/:userId" />
      
      <Route element={<PrivateRoute redirect="/" />} >
        <Route element={<EditProfilePage />} path="/perfil/editar/:userId" />
      </Route>
      <Route element={<PrivateRoute redirect="/" />} >
        <Route element={<ChangePassPage />} path="/perfil/senha/:userId" />
      </Route>
      {/* <Route element={<VerificationRoute redirect="/" />} > */}
      {/* </Route> */}
    </Routes >
  )
}

export default App
