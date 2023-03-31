import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

export const LoginContext = React.createContext();

// const testUsers = {
//   admin: {
//     username: "admin",
//     password: "ADMIN",
//     email: "admin@testuser.com",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM",
//   },
//   editor: {
//     username: "editor",
//     password: "EDITOR",
//     email: "editor@testuser.com",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU",
//   },
//   user: {
//     username: "user",
//     password: "USER",
//     email: "user@testuser.com",
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH",
//   },
// };

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState({ capabilities: [] });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = async (username, password) => {
    // const authUser = testUsers[username];
    let config = {
      baseURL: "https://api-js401.herokuapp.com",
      method: "post",
      url: "/signin",
      auth: { username, password },
    };

    let response = await axios(config);
    let user = response.data.user;
    let token = response.data.token;

    if (token) {
      try {
        validateToken(token);
      } catch (e) {
        setLoginState(loggedIn, token, user, e);
        console.error(e);
      }
    }
  };

  //   if (authUser && authUser.password === password) {
  //     try {
  //       validateToken(authUser.token);
  //       return true;
  //     } catch (e) {
  //       setError(e, "Invalid Token");
  //       console.error(e);
  //       return false;
  //     }
  //   }
  // };

  const logout = () => {
    setLoginState(false, null, { capabilities: [] });
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      console.log("Valid User", validUser);
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, { capabilities: [] }, e);
      console.log("Token Validation Error", e);
    }
  };

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save("auth", token);
    // this.setState({ token, loggedIn, user, error: error || null });
    setToken(token);
    setLoggedIn(loggedIn);
    setUser(user);
    setError(error || null);
  };

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load("auth");
    const token = qs.get("token") || cookieToken || null;
    validateToken(token);
  }, []);

  const state = {
    user,
    loggedIn,
    error,
    can,
    login,
    logout,
  };

  return (
    <LoginContext.Provider value={state}>{children}</LoginContext.Provider>
  );
};
export default LoginProvider;
