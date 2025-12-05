import { useContext, useEffect } from "../../core/hooks.js";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { navigate } from "../../core/router.js";

export function RequireRole({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role.toLowerCase() !== "admin") {
      navigate("/");
    }
  }, [user, loading]);

  // 2. Sólo mostramos hijos si el usuario es válido
  if (!user) return null;
  if (user.role.toLowerCase() !== "admin") return null;

  return children;
}
