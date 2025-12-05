import { createContext, useState, useEffect } from "../core/hooks.js";

const token = "";
let userdata = {};

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(token ? userdata : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let aborted = false;

    async function loadUserFromStorage() {
      try {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && !aborted) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } else if (!token && !aborted) {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth load error:", err);
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    loadUserFromStorage();
    return () => (aborted = true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser,loading }}>
      {children}
    </AuthContext.Provider>
  );
}
