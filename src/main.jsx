import "./styles/bootstrap.scss";                 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

import { createRoot } from "./core/renderer.js";
import { initRouter } from "./core/router.js";

import { AuthProvider } from "./contexts/AuthContext.jsx";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Body } from "./components/Body.jsx";

const appContainer = document.getElementById("rootDiv");

// ---------------------------------------------
// RootApp stays stable — Provider won't remount
// ---------------------------------------------
function RootApp() {

  return (
    <AuthProvider>
      <Header />
      <Body />
      <Footer />
    </AuthProvider>
  );
}

// createRoot should only be called ONCE
const rerenderApp = createRoot(RootApp, appContainer);

// Router will call this on every navigation
initRouter(() => {
  rerenderApp(); 
});

/*
const rerenderApp = createRoot( () => (
<AuthProvider>
  <Fragment>
    <Header />
    <Body />
    <Footer />
  </Fragment>
</AuthProvider>

),appContainer)

console.log("[MAIN] createRoot returned:", typeof rerenderApp);


initRouter(() => {
  console.log("[MAIN] initRouter callback -> calling rerenderApp()");
  rerenderApp();
});
*/