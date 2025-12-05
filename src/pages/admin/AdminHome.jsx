import { useContext } from "../../core/hooks";
import { AuthContext } from "../../contexts/AuthContext";

export function AdminHome() {
  const { user,loading} = useContext(AuthContext);


  if(loading) return null;

  return (
    <section className="maxWidth m-auto">

      <h1 className="h4">Bienvenido administrador: <span className="text-info h2">{user.name} {user.surname}</span></h1>
 
    </section>
  );
}
