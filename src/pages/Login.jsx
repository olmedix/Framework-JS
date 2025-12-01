import { useState, useEffect } from "../core/hooks.js";

export function Login() {
  const [user, setUser] = useState({});
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(null);


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let aborted = false;
    setIsSubmitting(true);
    setError(null);

    try {
            const data = await login(loginData);
            localStorage.setItem("authToken", data.access_token);
            setHasToken(true);
            window.location.href = "home";
            
    } catch (error) {
        setError(error.message);
    }
  };

  useEffect(() => {
    let aborted = false;

    async function loginUser() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        if (!res.ok) throw new Error("Error al hacer login el usuario");

        const data = await res.json();


        if (!aborted) setUsers(data.data.users);
      } catch (err) {
        if (!aborted) setError(err.message || "Error en useEffect AdminUser");
      } finally {
        if (!aborted) setLoading(false);
      }
    }
    loginUser();

    return () => (aborted = true);
  }, []);

  if (loading) return <p>Cargando usuario ...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-rosa mt-5 fs-1">Login</h2>

      <form
        class="mt-5 p-3 fs-4 bg-gris rounded shadow"
        onSubmit={handleLoginSubmit}
      >
        <div class="form-group mt-2">
          <label className="fw-bold" for="email">
            Dirección email
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Introduce email"
          ></input>
          <small id="emailHelp" class="form-text text-muted fs-6">
            Nunca compartiremos su email con nadie.
          </small>
        </div>
        <div class="form-group mt-2">
          <label className="fw-bold" for="password">
            Contraseña
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Contraseña"
          ></input>
        </div>

        <button type="submit" class="btn btn-primary mt-3 fs-4">
          Submit
        </button>
      </form>
    </section>
  );
}
