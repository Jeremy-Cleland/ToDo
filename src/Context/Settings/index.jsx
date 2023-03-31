import React, { useState, useEffect } from "react";

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [pageItems, setPageItems] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSorted, setShowSorted] = useState("difficulty");

  const saveLocal = () => {
    localStorage.setItem("pageItems", JSON.stringify(+pageItems));
    localStorage.setItem("showCompleted", JSON.stringify(showCompleted));
    localStorage.setItem("showSorted", JSON.stringify(showSorted));
  };

  const values = {
    pageItems,
    setPageItems,
    showCompleted,
    setShowCompleted,
    showSorted,
    setShowSorted,
    saveLocal,
  };

  useEffect(() => {
    const localPageItems = localStorage.getItem("pageItems");
    const localShowCompleted = localStorage.getItem("showCompleted");
    const localShowSorted = localStorage.getItem("showSorted");

    if (localPageItems) {
      setPageItems(JSON.parse(localPageItems));
    }
    if (localShowCompleted) {
      setShowCompleted(JSON.parse(localShowCompleted));
    }
    if (localShowSorted) {
      setShowSorted(JSON.parse(localShowSorted));
    }
  }, []);

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
