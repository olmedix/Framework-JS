import { useContext, useState } from "../core/hooks";
import { AuthContext } from "../contexts/AuthContext";
import { navigate } from "../core/router.js";

export function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({ ...user });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const res = await fetch(`/api/users/${user.id || user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
                   Authorization: `Bearer ${localStorage.getItem("authToken")}`
         },
        body: JSON.stringify(userData),
      });
      const data = await res.json();

      setUser(data.data);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmit(false);
      navigate("/");
    }
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="maxWidth m-auto">
      <h2 className="text-rosa mt-5 fs-1">Profile</h2>

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
            onChange={e =>{setUserData({...userData, name: e.target.value})}}
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
            onChange={e =>{setUserData({...userData, surname: e.target.value})}}
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
            onChange={e =>{setUserData({...userData, email: e.target.value})}}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary mt-3 fs-4">
          {isSubmit ? "Enviando..." : "Update"}
        </button>
      </form>
    </section>
  );
}
