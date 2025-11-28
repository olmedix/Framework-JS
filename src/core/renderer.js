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

  function render() {
    rootInstance.render = render; // para que los hooks puedan llamarlo

    // Ejecutamos el componente raíz como instancia
    beginComponentInstance(rootInstance);
    const vnode = rootInstance.type(rootInstance.props || {});
    endComponentInstance();

    container.innerHTML = "";
    if (vnode instanceof Node || vnode instanceof DocumentFragment) {
      container.appendChild(vnode);
    }

    // Ejecutamos efectos (useEffect) de todo el árbol
    runEffectsForInstance(rootInstance);
  }

  rootInstance.render = render;

  // Primer render
  render();

  // Devolvemos una función para forzar rerender de este root
  return function rerender(newProps) {
    if (newProps) {
      rootInstance.props = { ...rootInstance.props, ...newProps };
    }
    render();
  };
}
