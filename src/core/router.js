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

function splitRoute() {
  const path = getCurrentRoute();          
  const parts = path.split("/");        

  let isDynamic = false;
  let staticRoute = path;        

  const lastPart = parts[parts.length - 1];

  if (lastPart === "*") {
    isDynamic = true;

    const middleParts = parts.slice(1, -1);

    if (middleParts.length === 0) {

      staticRoute = "/";
    } else {
      staticRoute = "/" + middleParts.join("/"); 
    }
  }
  return {
    isDynamic,
    staticRoute,
  };
}


// Match de rutas
export function matchPath(pathPattern, currentPath) {
  const patternParts = pathPattern.split("/").filter(Boolean); 
  const currentParts = currentPath.split("/").filter(Boolean); 

  if (patternParts.length !== currentParts.length) {
    return { match: false, params: null };
  }

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const pPart = patternParts[i];   
    const cPart = currentParts[i];   

    if (pPart.startsWith(":")) {
      // segmento dinámico: :idUser, :email, etc.
      const paramName = pPart.slice(1); 
      params[paramName] = cPart;        
    } else {
      if (pPart !== cPart) {
        return { match: false, params: null };
      }
    }
  }
  // Si es correcto
  return { match: true, params };
}

export function getRegisteredRoutes() {
  return _routeRegistry;
}
