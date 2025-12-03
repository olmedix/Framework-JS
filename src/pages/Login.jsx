import { useState, useContext,getCurrentInstance} from "../core/hooks.js";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { navigate } from "../core/router.js";

export function Login() {
  const { user, setUser } = useContext(AuthContext);

  const [isSubmit,setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
    
      setUser(data.data.user);
      localStorage.setItem("authToken", data.data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }finally{
      setIsSubmit(false);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-rosa mt-5 fs-1">Login</h2>
      <h2 className="text-rosa mt-5 fs-1">{user ? `Welcome, ${user.name}` : "Please log in"}</h2>
      

      <form
        className="mt-5 p-3 fs-4 bg-gris rounded shadow"
        onSubmit={handleSubmit}
      >
        <div className="form-group mt-2">
          <label className="fw-bold" htmlFor="email">
            Dirección email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            aria-describedby="emailHelp"
            placeholder="Introduce email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <small id="emailHelp" className="form-text text-muted fs-6">
            Nunca compartiremos su email con nadie.
          </small>
        </div>
        <div className="form-group mt-2">
          <label className="fw-bold" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <button
          type="submit" 
          className="btn btn-primary mt-3 fs-4"
        >
          {isSubmit ? "Enviando..." : "Submit"}

        </button>
      </form>
    </section>
  );
}
