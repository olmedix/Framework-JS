import { useState, useEffect } from "../../core/hooks.js";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState(users);
  const [role, setRole] = useState("");
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
        if (!aborted) setFilterUsers(data.data.users);
      } catch (err) {
        if (!aborted) setError(err.message || "Error en useEffect AdminUsers");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    loadUsers();

    return () => (aborted = true);
  }, []);

  useEffect(() => {
    if (role === "") {
      setFilterUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) => user.role.toLowerCase() === role.toLowerCase()
    );
    setFilterUsers(filtered);
  }, [role, users]);

  if (loading) return <p>Cargando usuarios ...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(users);

  return (
    <section className="maxWidth m-auto">
      <h2>Admin de usuarios</h2>

      <div>
        <label for="role-select">Choose a role:</label>

        <select
          name="role"
          id="role-select"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">--Please choose an option--</option>
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="guest">Guest</option>
          <option value="user">User</option>
        </select>
        <button className="rounded-pill ms-5 mb-2 bg-primary">Add User</button>
      </div>

      <table className="table table-dark table-striped p-4">
        <thead>
          <tr>
            <th className="text-warning" scope="col">
              ID
            </th>
            <th className="text-warning" scope="col">
              Name
            </th>
            <th className="text-warning" scope="col">
              Surname
            </th>
            <th className="text-warning" scope="col">
              Email
            </th>
            <th className="text-warning" scope="col">
              Role
            </th>
            <th className="text-warning" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filterUsers?.map((user) => {
            return (
              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <i className="bi bi-pencil-fill text-warning-emphasis"></i>
                  <i className="bi bi-trash-fill mx-3 text-danger"></i>
                  <i className="bi bi-eye-fill text-info"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
