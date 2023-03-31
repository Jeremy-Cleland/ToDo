import { useContext } from "react";
import { LoginContext } from "../../Context/Auth";
import { When } from "react-if";

const Auth = ({ capability, children }) => {
  const { loggedIn, can } = useContext(LoginContext);

  const isLoggedIn = loggedIn;
  const canDo = capability ? can(capability) : true;

  const okToRender = isLoggedIn && canDo;
  return <When condition={okToRender}>{children}</When>;
};

export default Auth;
