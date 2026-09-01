// este archivo se ejecuta antes de compilar la app
// tauri lo usa para preparar el proyecto (genera codigo y configuraciones)

// la funcion principal del build de tauri
fn main() {
    // tauri_build::build prepara todo lo necesario para compilar la app
    tauri_build::build()
}
