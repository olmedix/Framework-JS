import { navigate } from "../core/router.js";
import { useState } from "../core/hooks.js";
import { useContext } from "../core/hooks";
import { AuthContext } from "../contexts/AuthContext";

export function Header() {
  const [url, setUrl] = useState("");
  const { user} = useContext(AuthContext);

  const routes = [
    { Home: "/" },
    { Projects: "/projects" },
    { Admin: "/admin/users" },
    { Login: "/login" },
    { Logout: "/logout" },
    { Register: "/register" },
  ];

  return (
    <header className="bg-dark">
      <h1 className="p-3 text-light text-center">Mi framework JS</h1>

      <nav className="navbar navbar-expand-sm navbar-dark maxWidth m-auto">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            {url}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              {routes.map((route) => {
                const [label, path] = Object.entries(route)[0];

                // ocultar "Login" y "Register" cuando el usuario esté logueado; ocultar "Logout" cuando no haya usuario
                if ((user && (label === "Login" || label === "Register")) || (!user && label === "Logout")) {
                  return null;
                }

                if(user && user?.role.toLowerCase() !== "admin" && label === "Admin") return null;
                if(!user  && label === "Admin") return null;

                return (
                  <li key={label} className="nav-item">
                    <a
                      className={`nav-link ${label === url ? "selected" : ""}`}
                      onClick={() => {
                        setUrl(label);
                        navigate(path);
                      }}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}

              {user && (
                <li className="nav-item">
                  <a
                      className={"nav-link fw-bold text-info"}
                      onClick={() => {
                        setUrl("Profile");
                        navigate("/profile");
                      }}
                    >
                      {user.name}
                    </a>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
