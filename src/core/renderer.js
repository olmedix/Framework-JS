let currentRoot = null;

export function getCurrentRoot() {
  return currentRoot;
}

export function createRoot(Component, container, initialProps = {}) {
  const root = {
    Component,
    container,
    props: initialProps,
    hooks: [],
    hookIndex: 0,
    effects: [],
    effectIndex: 0,
  };

  function runEffects() {
    for (const effect of root.effects) {
      // Saltamos los effects que no afectan a sus dependencias
      if (!effect || !effect.shouldRun) continue;

      // Si había un cleanup anterior, lo ejecutamos
      if (typeof effect.cleanup === "function") {
        effect.cleanup();
      }
      // Aquí se ejecuta realmente el useEffect
      const cleanup = effect.callback();
      // Guardamos el cleanup si el callback ha devuelto uno
      effect.cleanup = typeof cleanup === "function" ? cleanup : undefined;
      // Marcamos que el efecto ya se ejecutó
      effect.shouldRun = false;
    }
  }

  function render() {
    currentRoot = root;
    root.hookIndex = 0;
    root.effectIndex = 0;

    const vnode = root.Component(root.props || {});
    container.innerHTML = "";

    if (vnode instanceof Node || vnode instanceof DocumentFragment) {
      container.appendChild(vnode);
    }

    currentRoot = null;

    runEffects();
  }

  root.render = render;

  // primer render
  render();

  // función para rerenderizar este root
  return function rerender(newProps) {
    if (newProps) {
      root.props = { ...root.props, ...newProps };
    }
    render();
  };
}
