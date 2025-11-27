let routeChangeCallback = null;

export function getCurrentRoute() {
  return window.location.pathname || "/";
}

export function navigate(path) {
  if (path === getCurrentRoute()) return;
  window.history.pushState({}, "", path);
  handleRouteChange();
}

function handleRouteChange() {
  const route = getCurrentRoute();
  if (routeChangeCallback) {
    routeChangeCallback(route);
  }
}

export function initRouter(onRouteChange) {
  routeChangeCallback = onRouteChange;
  window.addEventListener("popstate", handleRouteChange);
  handleRouteChange(); // primera carga
}


// --- Soporte para <Router>/<Route> en JSX ---

// Registro temporal de rutas declaradas con <Route .../>
const _routeRegistry = [];

// Lo llama <Route /> para registrar sus props
export function registerRoute(props) {
  _routeRegistry.push(props);
}

// Lo usa <Router /> para leer rutas y luego vaciar el registro
export function consumeRegisteredRoutes() {
  const copy = _routeRegistry.slice();
  _routeRegistry.length = 0; // vaciamos para el siguiente render
  return copy;
}

// Match súper simple: por ahora solo igualdad exacta
export function matchPath(pathPattern, currentPath) {
  return pathPattern === currentPath;
  // Más adelante aquí meteremos rutas dinámicas, *, :id, etc.
}