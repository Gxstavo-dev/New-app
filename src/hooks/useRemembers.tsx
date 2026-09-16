import { useEffect, useState } from 'react';
import { useConnection } from './useConnection';
import RememberTypes from '../interfaces/RememberTypes';
import Database from '@tauri-apps/plugin-sql';

export default function useRemembers() {
  const { connexion } = useConnection();
  const [remembers, setRemembers] = useState<RememberTypes[]>([]);

  useEffect(() => {
    if (!connexion) return;
    ShowRemembers(connexion);
  }, [connexion]);

  const ShowRemembers = async (db: Database) => {
    const Remembers = await db.select<RememberTypes[]>('SELECT * FROM remembers');
    if (!Remembers) return [];
    setRemembers(Remembers);
  };

  return { remembers };
}
