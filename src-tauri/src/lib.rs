// este archivo define la logica del backend (rust) de tauri
// aqui se registran los comandos y los plugins de la app

// aprende mas sobre los comandos de tauri en:
// https://tauri.app/develop/calling-rust/

// este es un comando de ejemplo que tauri deja llamar desde el frontend (react)
// recibe un nombre y devuelve un saludo
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// esta funcion es el punto de entrada de la app en escritorio y movil
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // construimos la app de tauri
    tauri::Builder::default()
        // plugin para abrir enlaces o aplicaciones externas
        .plugin(tauri_plugin_opener::init())
        // plugin de sql: deja usar bases de datos desde el frontend
        .plugin(tauri_plugin_sql::Builder::default().build())
        // registramos los comandos que react puede llamar
        .invoke_handler(tauri::generate_handler![greet])
        // generamos el contexto y arrancamos la app
        .run(tauri::generate_context!())
        // si falla, mostramos el error
        .expect("error while running tauri application");
}
