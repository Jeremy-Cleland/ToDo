// import React, { useReducer, useContext, useEffect } from "react";

// export const SettingsContext = React.createContext();

// const initialState = {
//   showSorted: "Keyword",
//   showCompleted: true,
//   difficulty: 4,
//   numDisplayed: 3,
//   incomplete: [],
//   list: [],
// };

// const settingsReducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case "SHOW_COMPLETED":
//       return { ...state, showCompleted: !state.showCompleted };
//     case "SHOW_SORTED":
//       return { ...state, showSorted: payload };
//     case "NUMBER_DISPLAYED":
//       return { ...state, numDisplayed: payload };
//     case "ADD_ITEM":
//       return { ...state, list: [...state.list, payload] };
//     case "DELETE_ITEM":
//       return {
//         ...state,
//         list: state.list.filter((item) => item.id !== payload),
//       };
//     case "HANDLE_COMPLETE":
//       return {
//         ...state,
//         list: state.list.map((item) => {
//           if (item.id === payload) {
//             return { ...item, complete: !item.complete };
//           }
//           return item;
//         }),
//       };
//     case "HANDLE_INCOMPLETED":
//       return { ...state, incomplete: payload };
//     case "CHANGE_DIFFICULTY":
//       return { ...state, difficulty: payload };
//     case "GET_ITEMS":
//       return { ...state, list: payload };
//     default:
//       return state;
//   }
// };

// const SettingsProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(settingsReducer, initialState);
//   useEffect(() => {
//     const storedSettings = JSON.parse(localStorage.getItem("settings"));
//     if (storedSettings) {
//       dispatch({
//         type: "SHOW_COMPLETED",
//         payload: storedSettings.showCompleted,
//       });
//       dispatch({
//         type: "NUMBER_DISPLAYED",
//         payload: storedSettings.numDisplayed,
//       });
//       dispatch({ type: "SHOW_SORTED", payload: storedSettings.showSorted });
//     }
//   }, []);

//   const saveSettings = () => {
//     const settings = {
//       showSorted: state.showSorted,
//       numDisplayed: state.numDisplayed,
//       showCompleted: state.showCompleted,
//     };
//     localStorage.setItem("settings", JSON.stringify(settings));
//   };

//   const context = { state, dispatch, saveSettings };
//   return (
//     <SettingsContext.Provider value={context}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// const useSettings = () => {
//   const context = useContext(SettingsContext);
//   if (!context) {
//     throw new Error("You must use useSettings within a SettingsProvider");
//   }
//   return context;
// };

// export { SettingsProvider, useSettings };
