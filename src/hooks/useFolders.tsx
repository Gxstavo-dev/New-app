import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import Database from '@tauri-apps/plugin-sql';
import type { FolderItems } from '../types/FolderItems';

// hook que maneja el estado de las carpetas y sus operaciones crud
export default function useFolders() {
  const { connexion } = useConnection();
  const [folders, setFolders] = useState<FolderItems[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowFolders(connexion);
  }, [connexion]);

  // crea una carpeta con nombre por defecto y devuelve el id generado
  const CreateFolder = async () => {
    if (!connexion) return;
    const id = await connexion.execute('INSERT INTO carpetas(name) VALUES($1)', ['Default Name']);
    await ShowFolders(connexion);
    return id.lastInsertId;
  };

  // obtiene una carpeta por su id
  const GetFolder = async (id: number) => {
    if (!connexion) return;
    return await connexion.select('SELECT id,name FROM carpetas WHERE id=$1', [id]);
  };

  // actualiza el nombre de una carpeta por su id
  const UpdateNameFolder = async (id: number, name: string) => {
    if (!connexion) return;
    await connexion.execute('UPDATE carpetas SET name=$1 WHERE id=$2', [name, id]);
    await ShowFolders(connexion);
  };

  // elimina una carpeta por su id
  const DeleteFolder = async (id: number) => {
    if (!connexion) return;
    await connexion.execute('DELETE FROM carpetas WHERE id=$1', [id]);
    await ShowFolders(connexion);
  };

  // consulta todas las carpetas y las guarda en el estado
  const ShowFolders = async (db: Database) => {
    const carpetas = await db.select<FolderItems[]>('SELECT id,name FROM carpetas');
    setFolders(carpetas);
    if (!carpetas) return [];
  };

  return {
    folders,
    CreateFolder,
    GetFolder,
    UpdateNameFolder,
    DeleteFolder,
  };
}
