import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
// import Login from "../Components/Login";
import ToDo from "../Components/ToDo";
import Footer from "../Components/Footer";
import SettingsForm from "../Components/SettingsForm";
import HeaderComponent from "../Components/Header";
import { When } from "react-if";

const AppRoutes = () => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
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
    </>
  );
};

export default AppRoutes;
