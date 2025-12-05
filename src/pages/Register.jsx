import { navigate } from "../core/router.js";
import { useState } from "../core/hooks.js";

export function Register() {

  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});
  const [errorEmail, setErrorEmail] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "User",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      if (res.status === 400) return setErrorMessage(data.error);
      if (res.status === 409) return setErrorEmail(data.error);

      localStorage.setItem("authToken", data.data.token);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-rosa mt-5 fs-1">Register</h2>

      {errorMessage.name && <p className="text-danger">{errorMessage.name}</p>}
      {errorMessage.surname && (<p className="text-danger">{errorMessage.surname}</p>)}
      {errorMessage.password && (<p className="text-danger">{errorMessage.password}</p>)}
      {errorEmail && <p className="text-danger">{errorEmail}</p>}

      <form
        className="mt-5 p-3 fs-4 bg-gris rounded shadow"
        onSubmit={handleSubmit}
      >
        <div className="form-group mt-2">
          <label className="fw-bold" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={userData.name}
            aria-describedby="nameHelp"
            placeholder="Introduce name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          ></input>
        </div>

        <div className="form-group mt-2">
          <label className="fw-bold" htmlFor="surname">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            value={userData.surname}
            aria-describedby="surnameHelp"
            placeholder="Introduce surname"
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          ></input>
        </div>

        <div className="form-group mt-2">
          <label className="fw-bold" htmlFor="email">
            Dirección email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={userData.email}
            aria-describedby="emailHelp"
            placeholder="Introduce email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
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
            value={userData.password}
            placeholder="Contraseña"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
        </div>

        <button type="submit" className="btn btn-primary mt-3 fs-4">
          {isSubmit ? "Enviando..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
