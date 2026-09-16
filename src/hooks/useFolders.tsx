import { useEffect, useState } from 'react';
import { useConnection } from '../contexts/ConnectionContext';
import FoldersTypes from '../interfaces/FoldersTypes';
import Database from '@tauri-apps/plugin-sql';

export default function useFolders() {
  const { connexion } = useConnection();
  const [folders, setFolders] = useState<FoldersTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowFolders(connexion);
  }, [connexion]);

  const ShowFolders = async (db: Database) => {
    const Folders = await db.select<FoldersTypes[]>('SELECT * FROM folder');
    if (!Folders) return [];
    setFolders(Folders);
  };

  const Create = async (title: string, projectId: number) => {
    if (!connexion) return;
    const idProject = await connexion.execute('INSERT INTO folder(title,projectId) VALUES($1,$2)', [title, projectId]);
    ShowFolders(connexion);
    return idProject;
  };

  const Update = async (id: number, title?: string, projectId?: number) => {
    if (!connexion) return;
    if (title !== undefined) {
      await connexion.execute('UPDATE folder SET title = $1 WHERE id=$2', [title, id]);
    }
    if (projectId !== undefined) {
      await connexion.execute('UPDATE folder SET projectId = $1 WHERE id=$2', [projectId, id]);
    }
    ShowFolders(connexion);
  };

  const Delete = async (id: number) => {
    if (!connexion) return;
    if (!id) return;
    const ok = await connexion.execute('DELETE FROM folder WHERE id=$1', [id]);
    ShowFolders(connexion);
    return ok;
  };

  const AscDates = async () => {
    if (!connexion) return;
    const asc = await connexion.select<FoldersTypes[]>('SELECT * FROM folder ORDER BY created_at ASC');
    ShowFolders(connexion);
    return asc;
  };

  const DescDates = async () => {
    if (!connexion) return;
    const desc = await connexion.select<FoldersTypes[]>('SELECT * FROM folder ORDER BY created_at DESC');
    ShowFolders(connexion);
    return desc;
  };

  return { folders, Create, Update, Delete, AscDates, DescDates };
}
