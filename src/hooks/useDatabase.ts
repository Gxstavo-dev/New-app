// este es un hook (una funcion que se usa dentro de componentes de react)
// se encarga de abrir la conexion a la base de datos una sola vez
// y de guardarla en el store para reutilizarla en toda la app

import { useEffect } from "react";
// la libreria oficial de tauri para trabajar con sql
import Database from "@tauri-apps/plugin-sql";
// el store donde guardamos la base de datos ya conectada
import { useDatabaseStore } from "../store/useDatabase";

// este es el hook que usan los componentes para obtener la base de datos
export function useDatabase() {
  // leemos la base de datos actual del store (puede ser null)
  const db = useDatabaseStore((state) => state.db);
  // leemos la funcion que guarda la base de datos en el store
  const setDatabase = useDatabaseStore((state) => state.setDatabase);

  // este efecto corre al montar el componente
  useEffect(() => {
    // bandera para saber si el componente sigue montado
    // evita errores si el componente se desmonta antes de conectarse
    let mounted = true;

    // solo conectamos si todavia no hay base de datos guardada
    if (!db) {
      // abrimos la base de datos llamada app.db (la crea si no existe)
      Database.load("sqlite:app.db").then((database) => {
        // si el componente sigue montado, guardamos la conexion en el store
        if (mounted) {
          setDatabase(database);
        }
      });
    }

    // al desmontar, marcamos que ya no esta montado
    return () => {
      mounted = false;
    };
    // el efecto depende de la base de datos y de la funcion para guardarla
  }, [db, setDatabase]);

  // devolvemos la base de datos para que el componente la use
  return db;
}
