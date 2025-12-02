import {h,Fragment} from "./h.js"

// Instancia de componente actualmente en ejecución
let currentInstance = null;
const instanceStack = [];

// La usa h() y el renderer
export function beginComponentInstance(instance) {
  instanceStack.push(currentInstance);
  currentInstance = instance;
  // reiniciar contadores de hooks/efectos/hijos para ESTE componente
  instance.hookIndex = 0;
  instance.effectIndex = 0;
  instance.childIndex = 0;
}

export function endComponentInstance() {
  currentInstance = instanceStack.pop() || null;
}

export function getCurrentInstance() {
  return currentInstance;
}

// Crear una nueva instancia de componente
export function createComponentInstance(type, root) {
  return {
    type, // la función del componente (Home, AdminUser, etc.)
    hooks: [], // useState, etc.
    effects: [], // useEffect
    childInstances: [], // componentes hijos
    hookIndex: 0,
    effectIndex: 0,
    childIndex: 0,
    root, // referencia al root al que pertenece (para rerender)
    props: null,
    dom: null, // nodo DOM raíz de ESTE componente ( el padre )
    parent: null, // instancia padare
    render: null, // función para renderizar solo este componente
  };
}

// Ejecutar efectos (useEffect) de un componente y todos sus hijos
export function runEffectsForInstance(instance) {
  if (!instance) return;

  const effects = instance.effects || [];
  for (const effect of effects) {
    if (!effect || !effect.shouldRun) continue;

    // cleanup anterior
    if (typeof effect.cleanup === "function") {
      effect.cleanup();
    }

    const cleanup = effect.callback();
    effect.cleanup = typeof cleanup === "function" ? cleanup : undefined;
    effect.shouldRun = false;
  }

  // Recursivo sobre hijos
  const children = instance.childInstances || [];
  for (const child of children) {
    runEffectsForInstance(child);
  }
}

// =========================
//      useState
// =========================
export function useState(initialValue) {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "useState debe llamarse dentro de un componente renderizado"
    );
  }

  const index = instance.hookIndex++;

  if (instance.hooks[index] === undefined) {
    instance.hooks[index] = initialValue;
  }

  const setState = (newValue) => {
    const value =
      typeof newValue === "function"
        ? newValue(instance.hooks[index])
        : newValue;

    instance.hooks[index] = value;

    // Rerenderizar SOLO esta instancia
    if (typeof instance.render === "function") {
      instance.render();
    } else if (instance.root && typeof instance.root.render === "function") {
      // Si no tiene algo no tiene render , renderizamos desde el root.
      instance.root.render();
    }
  };

  return [instance.hooks[index], setState];
}

// =========================
//      useEffect
// =========================
export function useEffect(callback, deps) {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "useEffect debe llamarse dentro de un componente renderizado"
    );
  }

  const index = instance.effectIndex++;

  if (!instance.effects[index]) {
    // primera vez
    instance.effects[index] = {
      callback,
      deps,
      cleanup: null,
      shouldRun: true,
    };
    return;
  }

  const effect = instance.effects[index];

  // sin deps: siempre se ejecuta
  if (!deps) {
    effect.callback = callback;
    effect.deps = undefined;
    effect.shouldRun = true;
    return;
  }

  // con deps: comprobar cambios
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

  effect.callback = callback;
  effect.deps = deps;
  effect.shouldRun = changed;
}

// =========================
//      useContext
// =========================
export function createContext(defaultValue) {
  const context = {
    value: defaultValue,
    Provider: function Provider({ value, children }) {
      const instance = getCurrentInstance();
      if (!instance) {
        throw new Error("Provider debe usarse dentro de un componente");
      }

      // Guardamos el contexto en esta instancia
      if (!instance.contexts) {
        instance.contexts = new Map();
      }
      instance.contexts.set(context, value);

      const normalizedChildren = Array.isArray(children) ? children : [children];

      // Devuelve los children renderizados
      return h(Fragment, null, ...normalizedChildren);
    },
  };
  return context;
}

export function useContext(context) {
  let instance = getCurrentInstance();

  while (instance) {
    if (instance.contexts && instance.contexts.has(context)) {
      return instance.contexts.get(context);
    }
    instance = instance.parent;
  }
  return context.value;
}
