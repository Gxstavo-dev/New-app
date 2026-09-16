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

  const Create = async (db: Database, title: string, date: string, hour: string) => {
    const id = await db.execute('INSERT INTO remembers(title,date,hour) VALUES ($1,$2,$3)', [title, date, hour]);
    ShowRemembers(db);
    return id;
  };

  const Update = async (db: Database, id: number, title?: string, date?: string, hour?: string) => {
    if (!id) return;
    if (title !== undefined) {
      await db.execute('UPDATE remembers SET title = $1 WHERE id=$2', [title, id]);
    }
    if (date !== undefined) {
      await db.execute('UPDATE remembers SET date = $1 WHERE id=$2', [date, id]);
    }
    if (hour !== undefined) {
      await db.execute('UPDATE remembers SET hour = $1 WHERE id=$2', [hour, id]);
    }
    ShowRemembers(db);
  };

  const Delete = async (db: Database, id: number) => {
    if (!id) return;
    const ok = await db.execute('DELETE FROM remembers WHERE id=$1', [id]);
    ShowRemembers(db);
    return ok;
  };

  const AscDates = async (db: Database) => {
    const asc = await db.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at ASC');
    ShowRemembers(db);
    return asc;
  };

  const DescDates = async (db: Database) => {
    const desc = await db.select<RememberTypes[]>('SELECT * FROM remembers ORDER BY created_at DESC');
    ShowRemembers(db);
    return desc;
  };

  return { remembers, Create, Update, Delete, AscDates, DescDates };
}
