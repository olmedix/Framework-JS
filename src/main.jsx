import "./styles/bootstrap.scss";                 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 


import { createRoot } from "./core/renderer.js";
import { initRouter } from "./core/router.js";

import { AuthProvider } from "./contexts/AuthContext.jsx";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Body } from "./components/Body.jsx";

/*
const headerContainer = document.getElementById("header");
const bodyContainer = document.getElementById("body");
const footerContainer = document.getElementById("footer");

createRoot(() => <Header />, headerContainer);
createRoot(() => <Footer />, footerContainer);
const rerenderBody = createRoot(() => <Body />, bodyContainer);
*/



const appContainer = document.getElementById("rootDiv");
const rerenderApp = createRoot( () => (

    <Fragment>
    <Header />
    <Body />
    <Footer />
    </Fragment>


),appContainer)
// Cada cambio de ruta repintar solo el body
initRouter(() => {
  rerenderApp();
});
