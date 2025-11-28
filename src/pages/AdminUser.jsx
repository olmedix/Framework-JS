import { useState,useEffect } from "../core/hooks.js";


export function AdminUser() {

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect( () => {
    let aborted = false;

    async function loadUsers() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/users");

        if(!res.ok) throw new Error("Error al cargar los usuarios");

        const data = await res.json();
        //console.log("data: " + JSON.stringify(data.data));

        if (!aborted) setUsers(data.data.users);
        
      } catch (err) {
        if(!aborted)  setError(err.message || "Error en useEffect AdminUser")
      }finally{
        if(!aborted) setLoading(false);
      }
    }
    loadUsers();

    return () => aborted = true;

  },[]);

  if (loading) return <p>Cargando usuarios ...</p>
  if (error) return <p>Error: {error}</p>


  return (
    <section className="">
      <h2>Admin de usuarios</h2>
      <p>Aquí listarías usuarios, CRUD, etc.</p>

      
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name}</li>
        ))}
      </ul>
    </section>
  );
}
