import { useState } from "../core/hooks";

export function Home() {

  const [count,setCount] = useState(0);

  return (
    <section className="page page-home">
      <h2>Home</h2>
      <p>Bienvenido a mi framework con JSX + Vite.</p>

      <h1>Mi framework — Clicks: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </section>
  );
}
