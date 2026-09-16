import { appDataDir } from '@tauri-apps/api/path';
import Database from '@tauri-apps/plugin-sql';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

interface ConnectionType {
  connexion: Database | null;
  error: Error | null;
  mounted: boolean;
}

interface ProviderType {
  children: ReactNode;
}

const ConnectionContexts = createContext<ConnectionType | undefined>(undefined);

// carga la base de datos sqlite desde el directorio de datos de la app
// y crea las tablas notas, carpetas, proyectos y recuerdos si no existen
async function Connection(): Promise<Database> {
  const dir = (await appDataDir()).replace(/\/$/, '');
  const db = await Database.load(`sqlite:${dir}/notas.db`);

  await db.execute(`

        CREATE TABLE IF NOT EXISTS project(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nameProject TEXT NOT NULL DEFAULT 'Project',
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS note(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL DEFAULT 'No title yet',
          content TEXT,
          folderId INTEGER,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          FOREIGN KEY (folderId) REFERENCES folder(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS folder(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL DEFAULT 'Folder',
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          projectId INTEGER,
          FOREIGN KEY (projectId) REFERENCES project(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS remembers(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          date TEXT DEFAULT (strftime('%d/%m', 'now')),
          hour TEXT DEFAULT (strftime('%H:%M', 'now')),
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );

    `);

  return db;
}

// provider que inicializa la conexion a la base de datos una sola vez
// y la comparte con toda la app a traves del contexto
export function ConnectionProvider({ children }: ProviderType) {
  const [connexion, setConnexion] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let db: Database | null = null;

    (async () => {
      try {
        db = await Connection();
        setConnexion(db);
        setMounted(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setMounted(false);
      }
    })();

    return () => {
      db?.close();
    };
  }, []);

  return <ConnectionContexts.Provider value={{ connexion, error, mounted }}>{children}</ConnectionContexts.Provider>;
}

export function useConnection() {
  const context = useContext(ConnectionContexts);
  if (!context) throw new Error('Ocurrio un error con el Provider Connection');
  return context;
}
