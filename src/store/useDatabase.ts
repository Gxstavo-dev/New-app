// este es el store de zustand que guarda la conexion a la base de datos
// guardamos la base de datos aqui para no conectar cada vez que se use

import { create } from "zustand";
// importamos el tipo de la base de datos (solo el tipo, no el valor)
import type SqlDatabase from "@tauri-apps/plugin-sql";

// definimos la forma del store
export interface DatabaseState {
  // la base de datos conectada (null si todavia no cargo)
  db: SqlDatabase | null;
  // funcion para guardar la base de datos cuando se conecte
  setDatabase: (db: SqlDatabase) => void;
}

// creamos el store
export const useDatabaseStore = create<DatabaseState>((set) => ({
  // al inicio todavia no hay base de datos
  db: null,
  // esta funcion guarda la base de datos recibida
  setDatabase: (db) => set({ db }),
}));
