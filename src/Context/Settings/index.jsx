import React, { useReducer, useContext } from "react";

export const SettingsContext = React.createContext();

const initialState = {
  show: 4,
  showCompleted: false,
  sort: "difficulty",
  difficulty: 4,
  assignee: "",
  list: [],
  incomplete: [],
  isOpen: true,
};

const settingsReducer = (state, action) => {
  let { type, payload } = action;
  switch (type) {
    case "ADD_LIST_ITEM":
      return { ...state, list: [...state.list, payload] };

    case "ADJUST_DIFFICULTY":
      return { ...state, difficulty: payload };
    case "SET_ASSIGNEE":
      return { ...state, assignee: payload };
    case "DELETE_LIST_ITEM":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === payload) {
            return { ...item, complete: !item.complete };
          }
          return item;
        }),
      };
    case "TOGGLE_INCOMPLETE":
      return { ...state, incomplete: payload };
    case "SHOW_COMPLETED_ITEMS":
      return { ...state, showCompleted: !state.showCompleted };
    case "SHOW_ALL_ITEMS":
      return { ...state, displayNum: payload };
    case "SORT_BY_DIFFICULTY":
      return { ...state, sort: payload };
    case "OPEN_SIDEBAR":
      return { ...state, isOpen: payload };
    case "CLOSE_SIDEBAR":
      return { ...state, isOpen: payload };
    default:
      return state;
  }
};

const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);
  const values = { state, dispatch };

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsContext = () => {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error("useSettings must be used");
  } else {
    return settings;
  }
};
export { SettingsProvider, useSettingsContext };
