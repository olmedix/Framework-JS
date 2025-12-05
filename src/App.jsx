import {Fragment } from "./core/h.js";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {Header} from "./components/Header.jsx";
import {Body} from "./components/Body.jsx";
import {Footer} from "./components/Footer.jsx";

export function App() {
  return (
    <AuthProvider>
        <Header />
        <Body />
        <Footer />
    </AuthProvider>
  );
}
