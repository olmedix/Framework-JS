import { navigate } from "../core/router";

export function AdminHeader() {
  return (
    <div className="text-dark fw-bold maxWidth m-auto bg-light rounded-top">
      <ul className="navbar-nav ms-auto flex-row gap-3 ps-2">
        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => navigate("/admin")}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            onClick={() => navigate("/admin/users")}
            style={{ cursor: "pointer" }}
          >
            Users
          </a>
        </li>
      </ul>
    </div>
  );
}
