import { useContext } from "../../core/hooks.js";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { navigate } from "../../core/router.js";

export function RequireUser({ children }) {
  const { user,loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user){
    navigate("/login");
    return null;
  } 
  return children;
}
