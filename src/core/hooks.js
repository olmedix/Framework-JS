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

export function useEffect(callback, deps) {
  const root = getCurrentRoot();
  if (!root) {
    throw new Error("useEffect debe llamarse dentro de un componente renderizado");
  }

  const index = root.effectIndex++;
  if (!root.effects[index]) {
    // primera vez que se registra este efecto y lo prepara para ejecutarlo
    root.effects[index] = {
      callback,
      deps,
      cleanup: null,
      shouldRun: true,
    };
    return;
  }

  const effect = root.effects[index];

  // si no hay deps, siempre se ejecuta
  /* useEffect(() => {
      console.log("me ejecuto siempre");
     }); */
  if (!deps) {
    effect.callback = callback;
    effect.deps = undefined;
    effect.shouldRun = true;
    return;
  }

  // si hay deps, comprobamos si han cambiado
  const prevDeps = effect.deps;
  let changed = !prevDeps || prevDeps.length !== deps.length;

  if (!changed) {
    for (let i = 0; i < deps.length; i++) {
      if (deps[i] !== prevDeps[i]) {
        changed = true;
        break;
      }
    }
  }
  // Marcamos si debe volver a ejecutarse.
  effect.callback = callback;
  effect.deps = deps;
  effect.shouldRun = changed;
}
