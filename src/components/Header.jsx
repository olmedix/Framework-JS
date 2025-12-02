import { navigate } from "../core/router.js";
import { useState } from "../core/hooks.js";

export function Header() {
  const [url, setUrl] = useState("");

  const routes = [
    { Home: "/" },
    { Projects: "/projects" },
    { Admin: "/admin/users" },
    { Login: "/login" },
    { Register: "/register" },
  ];

  return (
    <header className="bg-dark">
      <h1 class="p-3 text-light text-center">Mi framework JS</h1>

      <nav className="navbar navbar-expand-sm navbar-dark maxWidth m-auto">
        <div className="container-fluid">
          <a class="navbar-brand" onClick={() => navigate("/")}>
            {url}
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto ">
              {routes.map((route) => {
                const [label, path] = Object.entries(route)[0];
        
                return (
                  <li className="nav-item">
                    <a className={`nav-link ${label === url ? "selected" : ""}`} onClick={() => {setUrl(label); navigate(path)}}>
                      {label}
                    </a>
                  </li>
                );
              })}

            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
