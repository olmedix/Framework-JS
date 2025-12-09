import { useState } from "../../core/hooks.js";

export function DeleteUser({ setDeleteUserPage, userSelected }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${userSelected._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (res.status === 401) throw new Error("No autorizado");
      if (res.status === 404) throw new Error("Usuario no encontrado");
      if (!res.ok) throw new Error("Error al eliminar el usuario");

      setSuccess(true);

      alert("Usuario eliminado correctamente");
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setDeleteUserPage(false);
      window.location.reload();
    }
  };

  if (loading) return <p className="text-danger">Eliminando usuario...</p>;
  if (error) return alert(JSON.stringify({ error }));

  return (
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center zindex-100">
        <div
          className="bg-white p-4 rounded shadow"
          style={{ minWidth: "320px" }}
        >
          <h4 className="mb-3">Eliminar usuario</h4>
          <p>
            ¿Seguro que quieres eliminar a{" "}
            <strong>
              {userSelected.name} {userSelected.surname}
            </strong>
            ?
          </p>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteUserPage(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
  );
}
