import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "../Components/Header";
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
          <Route path="/" element={<ToDo />} />
          <Route path="/settings" element={<SettingsForm />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default AppRoutes;
