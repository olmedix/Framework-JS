import {
  getCurrentInstance,
  beginComponentInstance,
  endComponentInstance,
  createComponentInstance,
} from "./hooks.js";

export function h(type, props, ...children) {
  props = props || {};

  // Aplanar hijos y filtrar null/undefined/booleans
  const flatChildren = [];
  function flatten(child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) {
      child.forEach(flatten);
    } else {
      flatChildren.push(child);
    }
  }
  flatten(children);

  // Componente de función: Header, Home, AdminUser, etc.
  if (typeof type === "function") {
    const parent = getCurrentInstance();
    let instance;
    let root = null;

    if (parent) {
      // El root de este componente es el mismo que el del padre
      root = parent.root;

      // Posición de este hijo dentro del padre
      const childIndex = parent.childIndex || 0;
      parent.childIndex = childIndex + 1;

      const existing = parent.childInstances[childIndex];

      // Reutilizamos instancia solo si es del mismo componente
      if (existing && existing.type === type) {
        instance = existing;
      } else {
        instance = createComponentInstance(type, root);
        parent.childInstances[childIndex] = instance;
      }
    } else {
      // Componente llamado sin padre (caso raro)
      instance = createComponentInstance(type, root);
    }

    instance.props = { ...props, children: flatChildren };

    beginComponentInstance(instance);
    const vnode = type(instance.props);
    endComponentInstance();

    return vnode;
  }

  // Elemento HTML normal
  const el = document.createElement(type);

  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      el.className = value;
    } else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase(); // onClick -> click
      el.addEventListener(eventName, value);
    } else if (key !== "children") {
      el.setAttribute(key, value);
    }
  }

  flatChildren.forEach((child) => {
    if (child instanceof Node) {
      el.appendChild(child);
    } else {
      el.appendChild(document.createTextNode(String(child)));
    }
  });

  return el;
}

// Fragmento para soportar <>
export function Fragment({ children }) {
  const fragment = document.createDocumentFragment();
  function append(child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) child.forEach(append);
    else if (child instanceof Node) fragment.appendChild(child);
    else fragment.appendChild(document.createTextNode(String(child)));
  }
  append(children);
  return fragment;
}
