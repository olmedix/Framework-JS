// src/core/renderer.js

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
  };

  function render() {
    currentRoot = root;
    root.hookIndex = 0;

    const vnode = root.Component(root.props || {});
    container.innerHTML = "";

    if (vnode instanceof Node || vnode instanceof DocumentFragment) {
      container.appendChild(vnode);
    }

    currentRoot = null;
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
