import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "../Components/Header";
import Auth from "../Components/Auth";
import Login from "../Components/Login";
import ToDo from "../Components/ToDo";
import Footer from "../Components/Footer";
import SettingsForm from "../Components/SettingsForm";
import HeaderComponent from "../Components/Header";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route
            path="/"
            element={
              <Auth capability="read">
                <ToDo />
              </Auth>
            }
          />
          <Route
            path="/settings"
            element={
              <Auth capability="update">
                <SettingsForm />
              </Auth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default AppRoutes;
