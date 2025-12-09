import { useState, useEffect } from "../../core/hooks.js";
import { navigate } from "../../core/router.js";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState(users);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Variables para la paginación
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitUsers, setLimitUsers] = useState(10);
  const [roleFilter, setRoleFilter] = useState("");

  //users?page=1&limit=5&role=Guest

  useEffect(() => {
    let aborted = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/users?page=${currentPage}&limit=${limitUsers}&role=${roleFilter}`
        );

        if (!res.ok) throw new Error("Error al cargar los usuarios");

        const data = await res.json();

        console.log("data users:", data);

        if (!aborted) setUsers(data.data.users);
        if (!aborted) setTotalPages(data.data.pagination.totalPages);
        if (!aborted) setFilterUsers(data.data.users);
      } catch (err) {
        if (!aborted) setError(err.message || "Error en useEffect AdminUsers");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    loadUsers();

    return () => (aborted = true);
  }, [currentPage, limitUsers, roleFilter]);

  if (loading) return <p>Cargando usuarios ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-center fs-1 text-danger">Admin de usuarios</h2>

      <section className="d-flex mb-3 justify-content-between">
        <div>
          <div className="mb-2">
            <label for="role-select">Choose a role:</label>

            <select
              name="role"
              id="role-select"
              className="text-center"
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">-- Choose Role --</option>
              <option value="">All</option>
              <option value="Admin">Admin</option>
              <option value="Guest">Guest</option>
              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label for="umberUsers-select">Choose a numbers of users:</label>
            <select
              name="numberUsers"
              id="numberUsers-select"
              className="text-center"
              onChange={(e) => setLimitUsers(e.target.value)}
            >
              <option value="">-- Choose number --</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div>
          <button
            className="rounded-pill ms-5 mb-2 bg-primary"
            onClick={() => navigate("/admin/users/add")}
          >
            Add User
          </button>
        </div>
      </section>

      <section className="d-flex justify-content-center m-5">
        <button onClick={() => setCurrentPage(1)}>First Page</button>
        <button
          onClick={() => {
            currentPage > 1 && setCurrentPage(currentPage - 1);
          }}
        >
          Previus Page
        </button>
        <span className="fs-3 text-success px-3 py-auto">
          Page {currentPage}/{totalPages}
        </span>
        <button
          onClick={() => {
            currentPage !== totalPages && setCurrentPage(currentPage + 1);
          }}
        >
          Next Page
        </button>
        <button onClick={() => setCurrentPage(totalPages)}>Last Page</button>
      </section>

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
