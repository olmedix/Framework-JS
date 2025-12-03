// src/Body.jsx
import { Router } from "../core/Router.jsx";
import { Route } from "../core/Route.jsx";

import { Home } from "../pages/Home.jsx";
import { Projects } from "../pages/Projects.jsx";
import { Login } from "../pages/Login.jsx";
import { Register } from "../pages/Register.jsx";
import { AdminUser } from "../pages/AdminUser.jsx";
import { NotFound } from "../pages/NotFound.jsx";

export function Body() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/admin/users" component={AdminUser} />
      <Route fallback component={NotFound} />
    </Router>
  );
}
