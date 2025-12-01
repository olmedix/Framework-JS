import { useState } from "../core/hooks";

export function Home() {

  const [count,setCount] = useState(0);

  return (
    <section className="maxWidth m-auto">
      <h2>Home</h2>
      <p>Bienvenido a mi framework con JSX + Vite. — Clicks: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </section>
  );
}
