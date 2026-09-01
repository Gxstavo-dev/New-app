// este archivo es el punto de entrada de la app (el inicio)

// react es la libreria base para construir la interfaz
import React from "react";
// react-dom se encarga de meter la app dentro del navegador (del dom)
import ReactDOM from "react-dom/client";
// importamos el componente principal de la app
import App from "./App";
// los estilos globales de css
import "./App.css";

// buscamos el elemento con id "root" en el html y lo usamos como base
// react va a dibujar toda la app dentro de ese elemento
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // strictmode ayuda a detectar errores en desarrollo
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
