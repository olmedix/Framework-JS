import {
  getCurrentRoute,
  consumeRegisteredRoutes,
  matchPath,
} from "../core/router.js";

export function Router({ children }) {

  void children; 

  const currentPath = getCurrentRoute();

  // Recuperamos las rutas registradas en este render
  const routes = consumeRegisteredRoutes();

  let matchedRoute = null;
  let matchedParams = null;
  let fallbackRoute = null;

  let params = {};

  for (const route of routes) {
    if (route.fallback) {
      fallbackRoute = route;
      continue;
    }

    if (route.path) {
      const {match,parms} = matchPath(route.path, currentPath);

      if(match){
        matchedRoute = route;
        matchedParams = params || {};
        break;
      }
    }
  }

  const routeToRender = matchedRoute || fallbackRoute;

  // Por si olvidamos la ruta por defecto
  if (!routeToRender) {
    return null;
  }

  // Ej: <Route path="/" component={Home} />
  if (routeToRender.component) {
    const Comp = routeToRender.component;
    return <Comp />;
  }

  //Ej: <Route path="/" element={<Home />} />
  if (routeToRender.element) {
    return routeToRender.element;
  }

  return null;
}
