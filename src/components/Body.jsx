// src/Body.jsx
import { Router } from "../core/Router.jsx";
import { Route } from "../core/Route.jsx";

import { Home } from "../pages/Home.jsx";
import { Projects } from "../pages/Projects.jsx";
import { Login } from "../pages/Login.jsx";
import { Logout } from "../pages/Logout.jsx";
import { Register } from "../pages/Register.jsx";
import { Profile } from "../pages/Profile.jsx";
import { AdminUser } from "../pages/AdminUser.jsx";
import { RequireRole } from "./guards/RequireRole.jsx";
import { RequireUser } from "./guards/RequireUser.jsx";
import { NotFound } from "../pages/NotFound.jsx";

export function Body() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route
        path="/profile"
        component={() => (
          <RequireUser>
            <Profile />
          </RequireUser>
        )}
      />
      <Route
        path="/admin/users"
        component={() => (
          <RequireRole>
            <AdminUser />
          </RequireRole>
        )}
      />
      <Route fallback component={NotFound} />
    </Router>
  );
}
