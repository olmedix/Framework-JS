import { navigate } from "../core/router.js";
import { useState } from "../core/hooks.js";

export function Header({ title }) {
  const [count, setCount] = useState(0);


  return (
    <header className="app-header">
      <h1>{title}</h1>
      <nav>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/admin/users")}>Admin users</button>
      </nav>

      <h1>Mi framework — Clicks: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </header>
  );
}
