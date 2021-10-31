import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { user, signin, signinAnon, signout } = useContext(AuthContext);
  return { user, signin, signinAnon, signout };
};

export default useAuth;
