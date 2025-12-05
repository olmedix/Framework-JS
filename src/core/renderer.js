import {
  beginComponentInstance,
  endComponentInstance,
  createComponentInstance,
  runEffectsForInstance,
} from "./hooks.js";

export function createRoot(Component, container, initialProps = {}) {
  // Creamos una instancia raíz
  const rootInstance = createComponentInstance(Component, null);
  rootInstance.root = rootInstance;   // el root de sí mismo es él mismo
  rootInstance.props = initialProps;
  rootInstance.container = container;

  function renderRoot() {
    rootInstance.render = renderRoot; // para que los hooks puedan llamarlo

    // Ejecutamos el componente raíz como instancia
    beginComponentInstance(rootInstance);
    let vnode = rootInstance.type(rootInstance.props || {});
    endComponentInstance();

    /**
     * ===============================================================
     * DETECTAR CONTEXT PROVIDER Y ACTUALIZAR VALOR
     * ===============================================================
     */
    if (vnode?.type?.isContextProvider && vnode.type._context) {
      const ctx = vnode.type._context;

      // 1. Actualizar valor del contexto
      ctx.value = vnode.props.value;

      // 2. Guardar la instancia actual del provider
      ctx.ProviderInstance = vnode;

      // 3. Renderizar solo los children
      vnode = vnode.props.children;
    }

    rootInstance.dom = vnode;

    container.innerHTML = "";
    if (vnode instanceof Node || vnode instanceof DocumentFragment) {
      container.appendChild(vnode);
    }

    // Ejecutamos efectos (useEffect) de todo el árbol
    runEffectsForInstance(rootInstance);
  }

  rootInstance.renderRoot = renderRoot;

  // Primer render
  renderRoot();

  // Devolvemos una función para forzar rerender de este root
  return function rerender(newProps) {
    if (newProps) {
      rootInstance.props = { ...rootInstance.props, ...newProps };
    }
    renderRoot();
  };
}
