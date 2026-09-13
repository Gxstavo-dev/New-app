import { appDataDir } from '@tauri-apps/api/path';
import Database from '@tauri-apps/plugin-sql';
import { useEffect, useRef, useState } from 'react';

// carga la base de datos sqlite desde el directorio de datos de la app
// y crea las tablas notas y carpetas si no existen
export async function Connection(): Promise<Database> {
  const dir = (await appDataDir()).replace(/\/$/, '');
  const db = await Database.load(`sqlite:${dir}/notas.db`);

  await db.execute("CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL DEFAULT 'No Title Yet')");
  await db.execute("CREATE TABLE IF NOT EXISTS carpetas(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT 'Folder default name')");
  return db;
}

// hook que inicializa la conexion a la base de datos una sola vez
// y expone el estado de conexion, error y si ya se monto
export function useConnection() {
  const [connexion, setConnexion] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      try {
        const db = await Connection();
        if (db) {
          setConnexion(db);
          setMounted(true);
        } else {
          setMounted(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setMounted(false);
      }
    })();
  }, []);

  return { connexion, error, mounted };
}
