import { useEffect, useState } from 'react';
import { useConnection } from '../contexts/ConnectionContext';
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

  const Create = async (title: string, date: string, hour: string) => {
    if (!connexion) return;
    const id = await connexion.execute('INSERT INTO remembers(title,date,hour) VALUES ($1,$2,$3)', [title, date, hour]);
    ShowRemembers(connexion);
    return id;
  };

  const Update = async (id: number, title?: string, date?: string, hour?: string) => {
    if (!connexion) return;
    if (!id) return;
    if (title !== undefined) {
      await connexion.execute('UPDATE remembers SET title = $1 WHERE id=$2', [title, id]);
    }
    if (date !== undefined) {
      await connexion.execute('UPDATE remembers SET date = $1 WHERE id=$2', [date, id]);
    }
    if (hour !== undefined) {
      await connexion.execute('UPDATE remembers SET hour = $1 WHERE id=$2', [hour, id]);
    }
    ShowRemembers(connexion);
  };

  const Delete = async (id: number) => {
    if (!connexion) return;
    if (!id) return;
    const ok = await connexion.execute('DELETE FROM remembers WHERE id=$1', [id]);
    ShowRemembers(connexion);
    return ok;
  };

  const AscDates = async () => {
    if (!connexion) return;
    const asc = await connexion.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at ASC');
    ShowRemembers(connexion);
    return asc;
  };

  const DescDates = async () => {
    if (!connexion) return;
    const desc = await connexion.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at DESC');
    ShowRemembers(connexion);
    return desc;
  };

  return { remembers, Create, Update, Delete, AscDates, DescDates };
}
