// este archivo define la forma (el tipo) de un boton
// asi todos los botones de la app siguen la misma estructura

// interfaz exportable para reutilizarla en otros archivos
export default interface Buttons {
  // el texto que se muestra en el boton (obligatorio)
  text: string;
  // una funcion opcional que se ejecuta al darle click
  function?: () => void;
}
