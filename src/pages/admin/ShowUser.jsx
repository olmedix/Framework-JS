export function ShowUser({ userSelected,setShowUserPage }) {
  return (
    <div className="position-fixed top-50 start-50 translate-middle bg-white  shadow-lg zindex-100">
      <div className="bg-dark text-warning text-center fs-3 py-2 cursor-pointer" onClick={()=>setShowUserPage(false)}>
        &#x274C; Cerrar
      </div>

      <div className="p-4">
        <h3>Datos del usuario</h3>

        <p>
          <strong>ID:</strong> {userSelected._id}
        </p>
        <p>
          <strong>Nombre:</strong> {userSelected.name}
        </p>
        <p>
          <strong>Apellido:</strong> {userSelected.surname}
        </p>
        <p>
          <strong>Email:</strong> {userSelected.email}
        </p>
        <p>
          <strong>Rol:</strong> {userSelected.role}
        </p>
      </div>
    </div>
  );
}
