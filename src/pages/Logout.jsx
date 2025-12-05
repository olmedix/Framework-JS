import { useState, useContext, useEffect } from "../core/hooks.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { navigate } from "../core/router.js";

export function Logout() {
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function handleLogout() {
      try {
        const res = await fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
      } catch (err) {
        setError(err.message);
      }
    }

    handleLogout();
  }, []); 

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h1>LOGOUT</h1>
    </section>
  );
}
