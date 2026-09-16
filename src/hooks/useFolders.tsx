import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import FoldersTypes from '../interfaces/FoldersTypes';
import Database from '@tauri-apps/plugin-sql';

export default function useQuerys() {
  const { connexion } = useConnection();
  const [folders, setFolders] = useState<FoldersTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowFolders(connexion);
  }, [connexion]);

  const ShowFolders = async (db: Database) => {
    const Folders = await db.select<FoldersTypes[]>('SELECT * FROM folders');
    if (!Folders) return [];
    setFolders(Folders);
  };

  return { folders };
}
