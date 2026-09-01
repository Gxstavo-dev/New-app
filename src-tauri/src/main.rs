// este archivo es el punto de entrada real del programa en rust

// en version final (release) de windows, oculta la consola extra
// no borres esto o aparecera una ventana de terminal al abrir la app
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// la funcion principal de todo programa en rust
fn main() {
    // llama a la funcion run que esta en lib.rs
    // lib.rs es donde esta la logica principal de la app
    notes_lib::run()
}
