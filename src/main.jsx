import { createRoot } from "./core/renderer.js";
import { initRouter, getCurrentRoute } from "./core/router.js";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Body } from "./components/Body.jsx";


const headerContainer = document.getElementById("header");
const bodyContainer = document.getElementById("body");
const footerContainer = document.getElementById("footer");

createRoot(() => <Header title="Mi framework JS" />, headerContainer);
createRoot(() => <Footer />, footerContainer);

const rerenderBody = createRoot(() => <Body />, bodyContainer);

// Cada cambio de ruta repintar solo el body
initRouter(() => {
  rerenderBody();
});
