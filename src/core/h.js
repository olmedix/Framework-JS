export function h(type, props, ...children) {
  props = props || {};

  // Si es un componente (función)
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  // Si es un tag HTML ("div", "button", etc.)
  const el = document.createElement(type);

  // Props / atributos
  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      el.className = value;
    } else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      // onClick -> "click"
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // Hijos
  const appendChild = (child) => {
    if (child == null || child === false) return;

    if (Array.isArray(child)) {
      child.forEach(appendChild);
    } else if (child instanceof Node) {
      el.appendChild(child);
    } else {
      el.appendChild(document.createTextNode(String(child)));
    }
  };

  children.forEach(appendChild);

  return el;
}

// Para soportar <>
export function Fragment({ children }) {
  const fragment = document.createDocumentFragment();
  const appendChild = (child) => {
    if (child == null || child === false) return;
    if (Array.isArray(child)) child.forEach(appendChild);
    else if (child instanceof Node) fragment.appendChild(child);
    else fragment.appendChild(document.createTextNode(String(child)));
  };
  appendChild(children);
  return fragment;
}
