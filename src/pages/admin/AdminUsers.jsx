import { useState, useEffect } from "../../core/hooks.js";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let aborted = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/users");

        if (!res.ok) throw new Error("Error al cargar los usuarios");

        const data = await res.json();

        if (!aborted) setUsers(data.data.users);
      } catch (err) {
        if (!aborted) setError(err.message || "Error en useEffect AdminUsers");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    loadUsers();

    return () => (aborted = true);
  }, []);

  if (loading) return <p>Cargando usuarios ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <nav>
        <ul className="navbar-nav ms-auto ">
          <li className="nav-item">
            <a
              className={"nav-link"}
              onClick={() => {
                navigate("/admin/users");
              }}
            >
              Users
            </a>
          </li>
        </ul>
      </nav>

      <h2>Admin de usuarios</h2>

      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name}</li>
        ))}
      </ul>
    </section>
  );
}
