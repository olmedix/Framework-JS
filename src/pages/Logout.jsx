import { useState, useContext,getCurrentInstance} from "../core/hooks.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { navigate } from "../core/router.js";

export function Logout() {
  const { user, setUser } = useContext(AuthContext);


  return (
    <section className="maxWidth m-auto">
      <h1>LOGOUT</h1>
    </section>
  );
}
