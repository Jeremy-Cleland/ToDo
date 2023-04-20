import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "../Context/Auth";
// import Login from "../Components/Login";
import ToDo from "../Components/ToDo";
import Footer from "../Components/Footer";
import SettingsForm from "../Components/SettingsForm";
import HeaderComponent from "../Components/Header";
import { When } from "react-if";

const AppRoutes = () => {
  const { loggedIn } = useContext(LoginContext);
  return (
      <BrowserRouter>
        <HeaderComponent />
        <When condition={loggedIn}>
          <Routes>
            <Route path="/" element={<ToDo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>
        <Footer />
      </BrowserRouter>
  );
};

export default AppRoutes;
