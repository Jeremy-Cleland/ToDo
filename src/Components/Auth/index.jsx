import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { When } from "react-if";

const Auth = ({ capability, children }) => {
  const { isLoggedIn, can } = useContext(AuthContext);

  // if the user is logged in and has the capability, render the children
  const okToRender = isLoggedIn && can(capability);
  // when the user is logged in and has the capability, render the children
  return <When condition={okToRender}>{children}</When>;
};

export default Auth;
