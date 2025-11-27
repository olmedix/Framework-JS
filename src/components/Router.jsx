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
  let fallbackRoute = null;

  for (const route of routes) {
    if (route.fallback) {
      fallbackRoute = route;
      continue;
    }

    if (route.path && matchPath(route.path, currentPath)) {
      matchedRoute = route;
      break;
    }
  }

  const routeToRender = matchedRoute || fallbackRoute;

  if (!routeToRender) {
    return null;
  }

  if (routeToRender.component) {
    const Comp = routeToRender.component;
    return <Comp />;
  }

  if (routeToRender.element) {
    return routeToRender.element;
  }

  return null;
}
