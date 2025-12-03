import {
  getCurrentRoute,
  matchPath,
  getRegisteredRoutes,
} from "./router.js";


export function Router() {
  const currentPath = getCurrentRoute();
  const routes = getRegisteredRoutes(); // ✅ NO CONSUMIR

  let matchedRoute = null;
  let fallbackRoute = null;

  for (const route of routes) {
    if (route.fallback) {
      fallbackRoute = route;
      continue;
    }

    if (route.path) {
      const { match } = matchPath(route.path, currentPath);
      if (match) {
        matchedRoute = route;
        break;
      }
    }
  }

  const routeToRender = matchedRoute || fallbackRoute;
  if (!routeToRender) return null;

  return h(routeToRender.component, {});
}
