// src/core/hooks.js
import { getCurrentRoot } from "./renderer.js";

export function useState(initialValue) {
  const root = getCurrentRoot();
  if (!root) {
    throw new Error("useState debe llamarse dentro de un componente renderizado");
  }

  const index = root.hookIndex++;

  if (root.hooks[index] === undefined) {
    root.hooks[index] = initialValue;
  }

  const setState = (newValue) => {
    const value =
      typeof newValue === "function" ? newValue(root.hooks[index]) : newValue;
    root.hooks[index] = value;
    root.render(); // solo rerenderiza este root
  };

  return [root.hooks[index], setState];
}
