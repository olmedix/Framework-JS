import { useState,useContext } from "../core/hooks";
import { AuthContext } from "../contexts/AuthContext";

export function Home() {

  const [count,setCount] = useState(0);
   const { user} = useContext(AuthContext);

  return (
    <section className="maxWidth m-auto">
      <h2>Home</h2>
      <p>{user ? `Welcome, ${user.name}` : "Please log in"}</p>
      <p>{user ? `Email: ${user.email}` : ""}</p>
      <p>{user ? `Role: ${user.role}` : ""}</p>
      <p>Bienvenido a mi framework con JSX + Vite. — Clicks: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </section>
  );
}
