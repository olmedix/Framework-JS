// src/Body.jsx
import { Router } from "../core/Router.jsx";
import { Route } from "../core/Route.jsx";

import { Home } from "../pages/Home.jsx";
import { Projects } from "../pages/Projects.jsx";
import { Login } from "../pages/Login.jsx";
import { Logout } from "../pages/Logout.jsx";
import { Register } from "../pages/Register.jsx";
import { Profile } from "../pages/Profile.jsx";
import { AdminHome } from "../pages/admin/AdminHome.jsx";
import { AdminUsers } from "../pages/admin/AdminUsers.jsx";
import { AddUser } from "../pages/admin/AddUser.jsx";
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
        path="/admin"
        component={() => (
          <RequireRole>
            <AdminHome />
          </RequireRole>
        )}
      />
      <Route
        path="/admin/users"
        component={() => (
          <RequireRole>
            <AdminUsers />
          </RequireRole>
        )}
      />
       <Route
        path="/admin/users/add"
        component={() => (
          <RequireRole>
            <AddUser />
          </RequireRole>
        )}
      />
      <Route fallback component={NotFound} />
    </Router>
  );
}
