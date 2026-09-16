import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
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

  const Create = async (db: Database, title: string, projectId: number) => {
    const idProject = await db.execute('INSERT INTO folder(title,projectId) VALUES($1,$2)', [title, projectId]);
    ShowFolders(db);
    return idProject;
  };

  const Update = async (db: Database, id: number, title: string) => {
    await db.execute('UPDATE folder SET title = $1 WHERE id=$2', [title, id]);
    ShowFolders(db);
  };

  const Delete = async (db: Database, id: number) => {
    if (!id) return;
    const ok = await db.execute('DELETE FROM folder WHERE id=$1', [id]);
    ShowFolders(db);
    return ok;
  };

  const AscDates = async (db: Database) => {
    const asc = await db.select<FoldersTypes[]>('SELECT * FROM folder ORDER BY created_at ASC');
    ShowFolders(db);
    return asc;
  };

  const DescDates = async (db: Database) => {
    const desc = await db.select<FoldersTypes[]>('SELECT * FROM folder ORDER BY created_at DESC');
    ShowFolders(db);
    return desc;
  };

  return { folders, Create, Update, Delete, AscDates, DescDates };
}
